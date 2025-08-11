
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const districtData = {
    '1': { name: 'District 1', kpi: 'KPI-1', price: '$4.50', knownFor: ['Known for this', 'and that'] },
    '2': { name: 'District 2', kpi: 'KPI-2', price: '$5.00', knownFor: ['Something else'] },
    '3': { name: 'Sunset Strip', kpi: 'KPI-3', price: '$7.20', knownFor: ['Nightlife', 'Music Venues'] },
    '4': { name: 'District 4', kpi: 'KPI-4', price: '$6.80', knownFor: ['Galleries', 'Boutiques'] },
    '5': { name: 'District 5', kpi: 'KPI-5', price: '$5.50', knownFor: ['Restaurants', 'Shops'] },
    '6': { name: 'District 6', kpi: 'KPI-6', price: '$4.75', knownFor: ['Creative offices'] },
    '7': { name: 'District 7', kpi: 'KPI-7', price: '$4.90', knownFor: ['Residential areas'] },
    '8': { name: 'District 8', kpi: 'KPI-8', price: '$4.60', knownFor: ['Local businesses'] },
    '9': { name: 'District Name', kpi: 'KPI-XXX', price: '$5.05', knownFor: ['Known for this', 'and this'] },
    '11': { name: 'Melrose Ave', kpi: 'KPI-11', price: '$6.10', knownFor: ['Fashion', 'Vintage shops'] },
};

type DistrictKey = keyof typeof districtData;


export default function FindYourDistrictPage() {
    const [activeDistrict, setActiveDistrict] = useState<DistrictKey | null>('9');

    const handleDistrictClick = (district: DistrictKey) => {
        setActiveDistrict(district);
    };

  return (
    <div className="py-16 md:py-24 lg:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold tracking-tight">Which district is best for me?</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    West Hollywood has 5 distinct business districts, all of which offer their own unique charm. Tap the numbers to learn more.
                </p>
            </div>
            <div className="mt-12 relative">
                <Image 
                    src="https://storage.googleapis.com/stabl-media/6f8e7228-d85c-4860-a81d-8417c2f0e309.png" 
                    alt="Map of West Hollywood Districts"
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                    data-ai-hint="map"
                />
                
                {Object.keys(districtData).map((key) => (
                    <button
                        key={key}
                        onClick={() => handleDistrictClick(key as DistrictKey)}
                        className={`absolute flex items-center justify-center w-8 h-8 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-200 transition-colors
                            ${key === '1' ? 'left-[26%] top-[86%]' : ''}
                            ${key === '2' ? 'left-[45%] top-[70%]' : ''}
                            ${key === '3' ? 'left-[40%] top-[45%]' : ''}
                            ${key === '4' ? 'left-[18%] top-[45%]' : ''}
                            ${key === '5' ? 'left-[20%] top-[60%]' : ''}
                            ${key === '6' ? 'left-[55%] top-[35%]' : ''}
                            ${key === '7' ? 'left-[55%] top-[50%]' : ''}
                            ${key === '8' ? 'left-[75%] top-[50%]' : ''}
                            ${key === '9' ? 'left-[65%] top-[75%]' : 'hidden'}
                            ${key === '11' ? 'left-[60%] top-[80%]' : ''}
                        `}
                    >
                       <div className="bg-primary text-primary-foreground rounded-full h-8 w-8 flex items-center justify-center">{key}</div>
                    </button>
                ))}

                {activeDistrict && (
                    <Card className="absolute left-1/2 -translate-x-1/2 top-[65%] md:left-auto md:right-0 md:top-1/2 md:translate-x-0 w-[300px] shadow-2xl">
                        <CardHeader>
                            <CardTitle>{districtData[activeDistrict].name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                             <div className="text-xs font-semibold bg-gray-100 inline-block px-2 py-1 rounded">KPI: {districtData[activeDistrict].kpi}</div>
                             <p className="text-2xl font-bold">{districtData[activeDistrict].price} <span className="text-sm font-normal text-muted-foreground">Avg price per sq ft</span></p>
                             <ul className="list-disc pl-5 text-muted-foreground text-sm space-y-1">
                                {districtData[activeDistrict].knownFor.map(item => <li key={item}>{item}</li>)}
                             </ul>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    </div>
  );
}

