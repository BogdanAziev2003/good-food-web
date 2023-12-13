import React, { useEffect, useState } from 'react'
import { deliveryPrice } from '../../store/features/itemsSlice'
import { useDispatch } from 'react-redux'
import tt from '@tomtom-international/web-sdk-maps'
import { services } from '@tomtom-international/web-sdk-services'
import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox'

const DelMap = ({ handlerAddressSend }) => {
  const dispatch = useDispatch()
  const [markerCoords, setMarkerCoords] = useState({
    lng: 44.53744880526385,
    lat: 43.18979061907433,
  })
  const [marker, setMarker] = useState(null)
  const [distance, setDistance] = useState(null)
  const [deliveryCost, setDeliveryCost] = useState(null)
  const [address, setAddress] = useState(null)

  useEffect(() => {
    handlerAddressSend(address)
    dispatch(deliveryPrice(deliveryCost))
  }, [address])

  const calculateDeliveryCost = (distance) => {
    const baseCost = 40
    const costPerKm = 16 // * km
    const totalCost = baseCost + distance * costPerKm
    const roundedCost = Math.round(totalCost / 5) * 5

    return roundedCost.toFixed(0)
  }

  useEffect(() => {
    const center = [44.53744880526385, 43.18979061907433]
    const map = tt.map({
      key: 'Kxh6ZAG4YAFR0TkIPoq3h5IFbvQVEI1e',
      container: 'map',
      center: center,
      zoom: 12,
    })
    const searchBoxInstance = new SearchBox(services, {
      serviceOptions: {
        key: 'Kxh6ZAG4YAFR0TkIPoq3h5IFbvQVEI1e',
        language: 'ru-RU',
      },
      searchOptions: {
        key: 'Kxh6ZAG4YAFR0TkIPoq3h5IFbvQVEI1e',
        language: 'ru-RU',
      },
      labels: {
        placeholder: 'Введите адресс',
        noResultsMessage: 'Такого адресса нет',
      },
      minNumberOfCharacters: 3,
      showSearchButton: true,
    })

    map.addControl(searchBoxInstance)
    map.on('load', (e) => {
      const center = map.getCenter()
      setMarkerCoords({ lng: center.lng, lat: center.lat })
      const newMarker = new tt.Marker().setLngLat(center).addTo(map)
    })

    map.on('click', (e) => {
      const { lng, lat } = e.lngLat
      if (marker) {
        marker.remove()
      }
      const newMarker = new tt.Marker().setLngLat([lng, lat]).addTo(map)
      setMarker((prevMarker) => {
        if (prevMarker) {
          prevMarker.remove()
        }
        return newMarker
      })
    })

    searchBoxInstance.on('tomtom.searchbox.resultselected', (event) => {
      const { lng, lat } = event.data.result.position
      let addresSearch = event.data.result.address.freeformAddress
      handleCalculateDistanceSearch(lng, lat, addresSearch)
    })

    return () => {
      map.removeControl(searchBoxInstance)
      map.remove()
    }
  }, [])

  const handleCalculateDistanceSearch = async (x, y, address) => {
    const lng1 = x
    const lat1 = y
    console.log(markerCoords)
    const { lng: lng2, lat: lat2 } = markerCoords

    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${lng1},${lat1};${lng2},${lat2}?overview=false`
    )

    const data = await response.json()
    if (data.routes && data.routes.length > 0) {
      const distance = data.routes[0].distance / 1000
      const deliveryCost = calculateDeliveryCost(distance)
      setDistance(distance)
      setDeliveryCost(deliveryCost)
      setAddress(address.slice(0, -8))
    } else {
      throw new Error('Ошибка при вычислении расстояния')
    }
  }

  function reverseAddress() {
    if (marker && markerCoords) {
      const { lng: lng1, lat: lat1 } = marker.getLngLat()
      fetch(
        `https://api.tomtom.com/search/2/reverseGeocode/${lat1},${lng1}.json?key=Kxh6ZAG4YAFR0TkIPoq3h5IFbvQVEI1e`
      )
        .then((response) => response.json())
        .then((data) => {
          let userAddress = data.addresses[0].address.freeformAddress.slice(
            0,
            -8
          )

          setAddress(userAddress)
        })
        .catch((error) => {
          console.log('Ошибка:', error)
        })
    }
  }

  const handleCalculateDistance = async () => {
    if (marker && markerCoords) {
      const { lng: lng1, lat: lat1 } = marker.getLngLat()
      const { lng: lng2, lat: lat2 } = markerCoords

      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${lng1},${lat1};${lng2},${lat2}?overview=false`
      )

      const data = await response.json()
      if (data.routes && data.routes.length > 0) {
        const distance = data.routes[0].distance / 1000
        const deliveryCost = calculateDeliveryCost(distance)
        setDistance(distance)
        setDeliveryCost(deliveryCost)
        reverseAddress()
      } else {
        throw new Error('Ошибка при вычислении расстояния')
      }
    }
  }

  return (
    <div className="map_content">
      <div id="searchbox"></div>
      <div id="map" className="map"></div>
      <button className="btn_map" onClick={handleCalculateDistance}>
        Выбрать
      </button>
    </div>
  )
}

export default DelMap
