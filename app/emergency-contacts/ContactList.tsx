'use client';

import { useMemo } from 'react';

interface EmergencyContact {
  id: string;
  name: string;
  organization: string;
  phoneNumbers: string[];
  category: string;
  description: string;
  availability: string;
  icon: string;
  color: string;
}

interface ContactListProps {
  searchQuery: string;
  selectedCategory: string;
}

export default function ContactList({ searchQuery, selectedCategory }: ContactListProps) {
  const emergencyContacts: EmergencyContact[] = [
    {
      id: '1',
      name: 'Philippine National Police',
      organization: 'PNP National Headquarters',
      phoneNumbers: ['117', '(02) 8723-0401'],
      category: 'police',
      description: 'National emergency police hotline',
      availability: '24/7',
      icon: 'ri-police-car-line',
      color: 'bg-blue-500'
    },
    {
      id: '2',
      name: 'Bureau of Fire Protection',
      organization: 'BFP National Headquarters',
      phoneNumbers: ['116', '(02) 8426-0219'],
      category: 'fire',
      description: 'Fire emergency and rescue services',
      availability: '24/7',
      icon: 'ri-fire-line',
      color: 'bg-red-500'
    },
    {
      id: '3',
      name: 'Philippine Red Cross',
      organization: 'National Headquarters',
      phoneNumbers: ['143', '(02) 8527-0000'],
      category: 'medical',
      description: 'Emergency medical services and disaster response',
      availability: '24/7',
      icon: 'ri-first-aid-kit-line',
      color: 'bg-red-600'
    },
    {
      id: '4',
      name: 'NDRRMC Emergency Hotline',
      organization: 'National Disaster Risk Reduction and Management Council',
      phoneNumbers: ['(02) 8911-1406', '(02) 8912-2665'],
      category: 'disaster',
      description: 'National disaster management coordination',
      availability: '24/7',
      icon: 'ri-shield-check-line',
      color: 'bg-orange-500'
    },
    {
      id: '5',
      name: 'Coast Guard Action Center',
      organization: 'Philippine Coast Guard',
      phoneNumbers: ['(02) 8527-8481', '(02) 8527-3877'],
      category: 'rescue',
      description: 'Maritime search and rescue operations',
      availability: '24/7',
      icon: 'ri-ship-line',
      color: 'bg-blue-600'
    },
    {
      id: '6',
      name: 'MMDA Emergency Response',
      organization: 'Metropolitan Manila Development Authority',
      phoneNumbers: ['136', '(02) 8882-4150'],
      category: 'rescue',
      description: 'Metro Manila traffic and emergency response',
      availability: '24/7',
      icon: 'ri-roadster-line',
      color: 'bg-green-600'
    },
    {
      id: '7',
      name: 'DOH Emergency Medical Services',
      organization: 'Department of Health',
      phoneNumbers: ['(02) 8651-7800', '911'],
      category: 'medical',
      description: 'National emergency medical services',
      availability: '24/7',
      icon: 'ri-hospital-line',
      color: 'bg-green-500'
    },
    {
      id: '8',
      name: 'PAGASA Weather Service',
      organization: 'Philippine Atmospheric, Geophysical and Astronomical Services Administration',
      phoneNumbers: ['(02) 8284-0800', '(02) 8433-2020'],
      category: 'disaster',
      description: 'Weather updates and typhoon information',
      availability: '24/7',
      icon: 'ri-cloudy-line',
      color: 'bg-blue-400'
    },
    {
      id: '9',
      name: 'PHIVOLCS Earthquake Info',
      organization: 'Philippine Institute of Volcanology and Seismology',
      phoneNumbers: ['(02) 8426-1468', '(02) 8426-1469'],
      category: 'disaster',
      description: 'Earthquake and volcano monitoring information',
      availability: '24/7',
      icon: 'ri-earthquake-line',
      color: 'bg-yellow-600'
    },
    {
      id: '10',
      name: 'Meralco Emergency',
      organization: 'Manila Electric Company',
      phoneNumbers: ['16211', '(02) 8631-2222'],
      category: 'utilities',
      description: 'Power outage reporting and electrical emergencies',
      availability: '24/7',
      icon: 'ri-flashlight-line',
      color: 'bg-yellow-500'
    },
    {
      id: '11',
      name: 'Maynilad Emergency',
      organization: 'Maynilad Water Services',
      phoneNumbers: ['1627', '(02) 8627-7000'],
      category: 'utilities',
      description: 'Water service interruption and pipe burst reporting',
      availability: '24/7',
      icon: 'ri-drop-line',
      color: 'bg-blue-300'
    },
    {
      id: '12',
      name: 'Manila Water Emergency',
      organization: 'Manila Water Company',
      phoneNumbers: ['1627', '(02) 8917-7777'],
      category: 'utilities',
      description: 'Water emergency and service issues',
      availability: '24/7',
      icon: 'ri-water-flash-line',
      color: 'bg-blue-500'
    }
  ];

  const filteredContacts = useMemo(() => {
    let filtered = emergencyContacts;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(contact => contact.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(contact => 
        contact.name.toLowerCase().includes(query) ||
        contact.organization.toLowerCase().includes(query) ||
        contact.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const callNumber = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="space-y-4">
      {filteredContacts.map((contact) => (
        <div key={contact.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-start space-x-4 mb-3">
            <div className={`${contact.color} rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0`}>
              <i className={`${contact.icon} text-white text-xl`}></i>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 mb-1">{contact.name}</h3>
              <p className="text-gray-600 text-sm mb-1">{contact.organization}</p>
              <p className="text-gray-500 text-sm">{contact.description}</p>
            </div>
            <div className="flex items-center space-x-1 text-green-600 text-sm flex-shrink-0">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{contact.availability}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {contact.phoneNumbers.map((phone, index) => (
              <button
                key={index}
                onClick={() => callNumber(phone)}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-phone-line text-sm"></i>
                </div>
                <span className="font-medium">{phone}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4 text-gray-500">
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-time-line"></i>
                </div>
                <span>Available {contact.availability}</span>
              </div>
            </div>
            <button 
              onClick={() => callNumber(contact.phoneNumbers[0])}
              className="text-red-600 hover:text-red-700 font-medium whitespace-nowrap"
            >
              Quick Call
            </button>
          </div>
        </div>
      ))}

      {filteredContacts.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
            <i className="ri-phone-line text-2xl text-gray-400"></i>
          </div>
          <p className="text-gray-500">No emergency contacts found matching your search.</p>
        </div>
      )}
    </div>
  );
}