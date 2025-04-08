import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Фикс для иконок маркеров
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const darkModeStyles = {
    mapContainer: {
        height: '400px',
        width: '100%',
        backgroundColor: '#000',
        border: '1px solid #444',
    },
    popup: {
        backgroundColor: '#111',
        color: '#f8f8f8', // Более светлый белый
        fontFamily: '"JetBrains Mono", monospace',
        borderRadius: '6px',
        padding: '12px',
        boxShadow: '0 2px 15px rgba(0,0,0,0.8)',
        border: '1px solid #444'
    },
    popupHeader: {
        color: '#ffffff', // Чистый белый
        marginBottom: '12px',
        fontSize: '17px',
        fontWeight: '700',
        letterSpacing: '0.3px'
    },
    popupText: {
        margin: '8px 0',
        fontSize: '15px',
        lineHeight: '1.6',
        color: '#f0f0f0' // Светло-серый
    }
};

const StationMap = ({ stations }) => {
    const calculateCenter = () => {
        if (stations.length === 0) return [50, 30];

        const sum = stations.reduce((acc, station) => {
            return {
                lat: acc.lat + station.lat,
                lng: acc.lng + station.lng
            };
        }, { lat: 0, lng: 0 });

        return [sum.lat / stations.length, sum.lng / stations.length];
    };

    return (
        <MapContainer
            center={calculateCenter()}
            zoom={5}
            style={darkModeStyles.mapContainer}
            zoomControl={true}
            attributionControl={false}
        >
            {/* Улучшенная темная тема с большим контрастом */}
            <TileLayer
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                noWrap={true}
                maxZoom={18}
                minZoom={2}
                detectRetina={true}
            />

            {/* Альтернативный вариант с яркими водами */}
            {/* <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            /> */}

            {stations.map((station, idx) => (
                <Marker key={`station-${idx}`} position={[station.lat, station.lng]}>
                    <Popup>
                        <div style={darkModeStyles.popup}>
                            <h4 style={darkModeStyles.popupHeader}>{station.name}</h4>
                            <p style={darkModeStyles.popupText}>
                                <strong style={{ color: '#fff' }}>Наблюдений:</strong> {station.count}
                            </p>
                            <p style={darkModeStyles.popupText}>
                                <strong style={{ color: '#fff' }}>Координаты:</strong><br />
                                {station.lat.toFixed(4)}°N, {station.lng.toFixed(4)}°E
                            </p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default StationMap;