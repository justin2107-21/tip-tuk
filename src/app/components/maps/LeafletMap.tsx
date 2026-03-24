import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  label: string;
  item?: string;
  price?: string;
  verified?: boolean;
  color?: string;
  icon?: string;
}

interface LeafletMapProps {
  markers: MapMarker[];
  center?: [number, number];
  zoom?: number;
  onMarkerClick?: (marker: MapMarker) => void;
  darkMode?: boolean;
  height?: string;
}

// Fix Leaflet's default icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

export function LeafletMap({
  markers,
  center = [14.5995, 120.9842], // Metro Manila
  zoom = 11,
  onMarkerClick,
  darkMode = false,
  height = "500px",
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(center, zoom);

      // Add tile layer
      L.tileLayer(
        darkMode
          ? "https://tiles.stadiamaps.com/tiles/stamen_tonerlight/{z}/{x}/{y}.png"
          : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            darkMode
              ? '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          maxZoom: 19,
        }
      ).addTo(mapInstanceRef.current);
    }

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      mapInstanceRef.current?.removeLayer(marker);
    });
    markersRef.current.clear();

    // Add new markers
    markers.forEach((markerData) => {
      const customIcon = L.divIcon({
        html: `
          <div class="flex items-center justify-center" style="
            background: ${markerData.color || '#2E7D32'};
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            border: 3px solid white;
          ">
            ${markerData.icon || "📍"}
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });

      const marker = L.marker([markerData.lat, markerData.lng], { icon: customIcon })
        .bindPopup(`
          <div style="min-width: 200px;">
            <p style="font-weight: bold; margin-bottom: 8px;">${markerData.label}</p>
            ${markerData.item ? `<p>${markerData.item}</p>` : ""}
            ${markerData.price ? `<p style="color: #2E7D32; font-weight: bold;">${markerData.price}</p>` : ""}
            ${markerData.verified ? `<p style="color: green; font-size: 12px;">✓ Verified</p>` : ""}
          </div>
        `)
        .on("click", () => {
          if (onMarkerClick) onMarkerClick(markerData);
        })
        .addTo(mapInstanceRef.current!);

      markersRef.current.set(markerData.id, marker);
    });

    // Fit bounds if we have markers
    if (markers.length > 0) {
      const group = new L.FeatureGroup(Array.from(markersRef.current.values()));
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  }, [markers, center, zoom, onMarkerClick, darkMode]);

  return (
    <div
      ref={mapRef}
      style={{
        height,
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        border: "1px solid #e0e0e0",
        position: "relative",
        zIndex: 1,
      }}
    />
  );
}
