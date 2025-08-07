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
      phoneNumbers: ['+63 (32) 322 5166','322-5166'],
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
      phoneNumbers: ['(032) 467‑9006', '(032) 467‑9115'],
      category: 'fire',
      description: 'Fire emergency and rescue services',
      availability: '24/7',
      icon: 'ri-fire-line',
      color: 'bg-red-500'
    },
    {
      id: '4',
      name: 'CDRRMO',
      organization: 'National Disaster Risk Reduction and Management Council',
      phoneNumbers: ['(032) 322 7911','0977 834 7619'],
      category: 'disaster',
      description: 'City Disaster Risk Reduction and Management Office',
      availability: '24/7',
      icon: 'ri-shield-check-line',
      color: 'bg-orange-500'
    },
    {
      id: '5',
      name: 'Coast Guard Action Center',
      organization: 'Philippine Coast Guard',
      phoneNumbers: ['+639296787928'],
      category: 'rescue',
      description: 'Maritime search and rescue operations',
      availability: '24/7',
      icon: 'ri-ship-line',
      color: 'bg-blue-600'
    },
    {
      id: '7',
      name: 'DOH Emergency Medical Services',
      organization: 'Department of Health',
      phoneNumbers: ['911'],
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
      phoneNumbers: ['(032) 340‑1868'],
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
      phoneNumbers: ['8426-1468'],
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
      phoneNumbers: ['(032) 467‑8298', '(032) 322‑5754' ,'09176244406'],
      category: 'utilities',
      description: 'Power outage reporting and electrical emergencies',
      availability: '24/7',
      icon: 'ri-flashlight-line',
      color: 'bg-yellow-500'  
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