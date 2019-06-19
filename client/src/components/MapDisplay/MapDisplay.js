import React from 'react'

export class MapDisplay extends React.Component {
  componentDidMount() {
    this.initMap(this.props.data)
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.initMap(this.props.data)
    }
  }

  initMap = (data) => {
    // The location of Uluru
    const uluru = { lat: -25.344, lng: 131.036 }
    // The map, centered at Uluru
    const map = new google.maps.Map(
      document.getElementById('map-box'), { zoom: 10, center: uluru },
    )

    const geocoder = new google.maps.Geocoder()
    data.forEach((element) => {
      const {
        address,
        category,
        city,
        state,
        zipCode,
      } = element
      const fullAddress = `${address} ${category} ${city} ${state} ${zipCode}`
      if (geocoder) {
        geocoder.geocode({ address: fullAddress }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            if (status !== google.maps.GeocoderStatus.ZERO_RESULTS) {
              map.setCenter(results[0].geometry.location)

              const marker = new google.maps.Marker({
                position: results[0].geometry.location,
                map,
                title: address,
              })
            } else {
              console.log('No results found')
            }
          } else {
            console.log(`Geocode was not successful for the following reason: ${status}`)
          }
        })
      }
    })
  }

  render() {
    return (
      <div style={{ flex: 1 }} id="map-box" />
    )
  }
}
