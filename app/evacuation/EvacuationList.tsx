'use client';

import { useState, useMemo } from 'react';

interface EvacuationCenter {
  id: string;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  capacity: number;
  facilities: string[];
  type: 'school' | 'gym' | 'community' | 'government';
}

interface EvacuationListProps {
  userLocation: { lat: number; lng: number };
}

export default function EvacuationList({ userLocation }: EvacuationListProps) {
  const [selectedType, setSelectedType] = useState<string>('all');

  const evacuationCenters: EvacuationCenter[] = [
    {
      id: '1',
    name: 'Toledo City Sports Center',
    address: '9MM2+GVR, Toledo, Cebu',
    city: 'Toledo City',
    lat: 10.390000387947026,
    lng: 123.6537453121649,
    capacity: 500,
    facilities: ['Restrooms', 'Medical Station', 'Parking'],
    type: 'community'
    },
    {
      id: '2',
    name: 'Toledo City National Vocational School',
    address: 'Toledo National Vocational School, 9MM4+5VG, Toledo - Manipis Rd, Toledo, Cebu',
    city: 'Toledo City',
    lat: 10.383192712172352, 
    lng: 123.65722728098808,
    capacity: 450,
    facilities: ['Restrooms', 'Shower', 'Kitchen'],
    type: 'school'
    },
    {
      id: '3',
    name: 'Balamban Gymnasium',
    address: 'Barangay Baliwagan',
    city: 'Balamban',
    lat: 10.4830,
    lng: 123.7141,
    capacity: 600,
    facilities: ['Restrooms', 'Parking', 'Shower'],
    type: 'gym'
    },
    {
      id: '4',
    name: 'Luray II National High School',
    address: '6038 Diosdado Macapagal Hwy, Toledo, Cebu',
    city: 'Toledo City',
    lat: 10.38021330147729, 
    lng: 123.642683052153,
    capacity: 250,
    facilities: ['Restrooms', 'Kitchen'],
    type: 'government'
    },
    {
      id: '5',
    name: 'Consolatrix College of Toledo City, Inc.',
    address: '645 Hinulawan St, Toledo, Cebu',
    city: 'Toledo City',
    lat: 10.373997552005143,
    lng: 123.63697188098793,
    capacity: 400,
    facilities: ['Restrooms', 'Medical Station'],
    type: 'school'
    },
    {
      id: '6',
    name: 'Pinamungajan Municipal Hall Grounds',
    address: 'Poblacion',
    city: 'Pinamungajan',
    lat: 10.2315,
    lng: 123.5811,
    capacity: 350,
      facilities: ['Restrooms', 'Tent Area'],
      type: 'open area'
    }
  ];

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const centersWithDistance = useMemo(() => {
    return evacuationCenters
      .map(center => ({
        ...center,
        distance: calculateDistance(userLocation.lat, userLocation.lng, center.lat, center.lng)
      }))
      .sort((a, b) => a.distance - b.distance);
  }, [userLocation]);

  const filteredCenters = useMemo(() => {
    if (selectedType === 'all') return centersWithDistance;
    return centersWithDistance.filter(center => center.type === selectedType);
  }, [centersWithDistance, selectedType]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'school': return 'ri-school-line';
      case 'gym': return 'ri-basketball-line';
      case 'community': return 'ri-community-line';
      case 'government': return 'ri-government-line';
      default: return 'ri-building-line';
    }
  };

  const getDirectionsUrl = (lat: number, lng: number, name: string) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(name)}`;
  };

  return (
    <div className="px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-map-pin-user-line text-green-600"></i>
            </div>
            <span className="text-sm text-gray-600">Your current location detected</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                selectedType === 'all' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Centers
            </button>
            <button
              onClick={() => setSelectedType('school')}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                selectedType === 'school' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Schools
            </button>
            <button
              onClick={() => setSelectedType('gym')}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                selectedType === 'gym' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Gyms
            </button>
            <button
              onClick={() => setSelectedType('community')}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                selectedType === 'community' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Community
            </button>
            <button
              onClick={() => setSelectedType('government')}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                selectedType === 'government' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Government
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredCenters.map((center, index) => (
            <div key={center.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-lg">
                    <i className={`${getTypeIcon(center.type)} text-red-600`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{center.name}</h3>
                    <p className="text-gray-600 text-sm mb-1">{center.address}</p>
                    <p className="text-gray-500 text-sm">{center.city}</p>
                  </div>
                </div>
                {index === 0 && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full whitespace-nowrap">
                    Nearest
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-route-line"></i>
                  </div>
                  <span>{center.distance.toFixed(1)} km away</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-user-line"></i>
                  </div>
                  <span>{center.capacity} capacity</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Available Facilities:</p>
                <div className="flex flex-wrap gap-1">
                  {center.facilities.map((facility, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded whitespace-nowrap"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <a
                  href={getDirectionsUrl(center.lat, center.lng, center.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-red-600 text-white text-center py-2 px-4 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
                >
                  <i className="ri-navigation-line mr-2"></i>
                  Get Directions
                </a>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
                  <i className="ri-phone-line mr-2"></i>
                  Call
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCenters.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
              <i className="ri-map-pin-2-line text-2xl text-gray-400"></i>
            </div>
            <p className="text-gray-500">No evacuation centers found for the selected type.</p>
          </div>
        )}
      </div>
    </div>
  );
}