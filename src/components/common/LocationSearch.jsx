"use client"

import { useState, useEffect, useRef } from "react"
import { BsGeoAlt } from "react-icons/bs"
import { MdOutlineMyLocation } from "react-icons/md"
import { getCurrentLocation, getAddressFromCoords, searchAddresses } from "../../services/locationService"
import { useLocation } from "../../contexts/LocationContext"

const LocationSearch = ({ onLocationSelect }) => {
  const { selectedLocation, updateLocation } = useLocation()
  const [query, setQuery] = useState(selectedLocation.address || "")
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchTimeout = useRef(null)
  const wrapperRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Đồng bộ query khi context thay đổi
  useEffect(() => {
    if (selectedLocation?.address && selectedLocation.address !== query) {
      setQuery(selectedLocation.address)
    }
  }, [selectedLocation])

  const handleSearch = (value) => {
    setQuery(value)
    setError("")

    if (searchTimeout.current) clearTimeout(searchTimeout.current)

    searchTimeout.current = setTimeout(async () => {
      if (value.length < 3) {
        setSuggestions([])
        return
      }

      setLoading(true)
      try {
        const results = await searchAddresses(value)
        setSuggestions(results)
        setShowSuggestions(true)
      } catch {
        setError("Không thể tìm kiếm địa chỉ")
        setSuggestions([])
      } finally {
        setLoading(false)
      }
    }, 500)
  }

  const handleGetCurrentLocation = async () => {
    setLoading(true)
    setError("")
    try {
      const position = await getCurrentLocation()
      const address = await getAddressFromCoords(position.coords.latitude, position.coords.longitude)

      const locationData = {
        address: address.formatted,
        shortAddress: address.shortAddress,
        fullAddress: address.full,
        coordinates: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
      }

      updateLocation(locationData)
      setQuery(address.formatted)
      onLocationSelect && onLocationSelect(locationData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectAddress = (suggestion) => {
    const locationData = {
      address: suggestion.formatted,
      shortAddress: suggestion.shortAddress,
      fullAddress: suggestion.displayName,
      coordinates: {
        lat: suggestion.lat,
        lng: suggestion.lon,
      },
    }

    updateLocation(locationData)
    setQuery(suggestion.formatted)
    setShowSuggestions(false)
    onLocationSelect && onLocationSelect(locationData)
  }

  return (
    <div className="position-relative" ref={wrapperRef}>
      <div className="position-relative">
        <input
          type="text"
          className="form-control border-1 shadow-sm py-2 ps-5 pe-5"
          style={{ borderRadius: "8px" }}
          placeholder="Tìm kiếm vị trí quán ăn"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length >= 3 && setShowSuggestions(true)}
        />
        <BsGeoAlt
          className="position-absolute text-secondary"
          style={{ left: "15px", top: "50%", transform: "translateY(-50%)" }}
        />
        <button
          className="btn btn-link position-absolute p-0"
          style={{
            right: "15px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#6c757d",
          }}
          onClick={handleGetCurrentLocation}
          disabled={loading}
        >
          {loading ? <div className="spinner-border spinner-border-sm text-secondary" /> : <MdOutlineMyLocation />}
        </button>
      </div>

      {error && <div className="text-danger small mt-1">{error}</div>}

      {showSuggestions && suggestions.length > 0 && (
        <div className="position-absolute w-100 mt-1 bg-white rounded shadow-sm border" style={{ zIndex: 1000 }}>
          {suggestions.map((s) => (
            <div
              key={s.id}
              className="d-flex align-items-center p-3 border-bottom suggestion-item"
              onClick={() => handleSelectAddress(s)}
              style={{ cursor: "pointer" }}
            >
              <div
                className="location-icon me-3 d-flex align-items-center justify-content-center bg-light rounded-circle"
                style={{ width: "40px", height: "40px" }}
              >
                <BsGeoAlt size={18} className="text-secondary" />
              </div>
              <div>
                <div className="fw-medium">{s.shortAddress}</div>
                <div className="small text-muted">{s.displayName}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LocationSearch
