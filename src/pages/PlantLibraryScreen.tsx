import React, { useState } from 'react';
import { 
  IonPage, 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons,
  IonBackButton,
  IonSearchbar,
  IonFooter,
  IonButton,
  IonIcon
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, BookOpen, Users, User, Download } from 'lucide-react';

// Sample plant data
const plantData = [
  {
    id: 1,
    name: 'Tomato',
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg',
    diseases: 3,
    hasGuide: true,
  },
  {
    id: 2,
    name: 'Potato',
    image: 'https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg',
    diseases: 2,
    hasGuide: true,
  },
  {
    id: 3,
    name: 'Apple',
    image: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg',
    diseases: 4,
    hasGuide: true,
  },
  {
    id: 4,
    name: 'Corn',
    image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg',
    diseases: 2,
    hasGuide: false,
  },
];

const PlantLibraryScreen: React.FC = () => {
  const history = useHistory();
  const [searchText, setSearchText] = useState('');
  
  const filteredPlants = plantData.filter(plant => 
    plant.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const navigateTo = (path: string) => {
    history.push(path);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': 'white', '--padding-top': 'var(--ion-safe-area-top, 0) + 16px' }}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle className="text-primary">Plant Library</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <div className="p-4">
          <IonSearchbar
            value={searchText}
            onIonChange={e => setSearchText(e.detail.value!)}
            placeholder="Search plants"
            className="mb-4 rounded-xl"
            style={{ '--border-radius': '1rem', '--background': 'white' }}
          />
          
          <div className="space-y-4">
            {filteredPlants.map((plant, index) => (
              <motion.div
                key={plant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="relative">
                  <img 
                    src={plant.image} 
                    alt={plant.name} 
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h3 className="text-white font-bold text-lg">{plant.name}</h3>
                  </div>
                </div>
                
                <div className="p-3">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-600">{plant.diseases} Common Diseases</span>
                    {plant.hasGuide && (
                      <div className="flex items-center text-primary text-sm font-medium">
                        <Download size={14} className="mr-1" />
                        Care Guide
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <IonButton
                      fill="outline"
                      size="small"
                      className="rounded-lg"
                      style={{ '--border-radius': '0.5rem' }}
                    >
                      Diseases
                    </IonButton>
                    
                    <IonButton
                      size="small"
                      className="rounded-lg"
                      style={{ '--background': '#1B5E20', '--border-radius': '0.5rem' }}
                    >
                      View Details
                    </IonButton>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {filteredPlants.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No plants match your search.</p>
              </div>
            )}
          </div>
        </div>
      </IonContent>
      
      <IonFooter>
        <IonToolbar style={{ '--background': 'white' }}>
          <IonButtons className="flex justify-around">
            <IonButton onClick={() => navigateTo('/home')}>
              <div className="flex flex-col items-center">
                <Leaf size={20} className="text-gray-500" />
                <span className="text-xs mt-1">Home</span>
              </div>
            </IonButton>
            
            <IonButton onClick={() => navigateTo('/plant-library')}>
              <div className="flex flex-col items-center">
                <BookOpen size={20} className="text-primary" />
                <span className="text-xs mt-1">Library</span>
              </div>
            </IonButton>
            
            <IonButton onClick={() => navigateTo('/community')}>
              <div className="flex flex-col items-center">
                <Users size={20} className="text-gray-500" />
                <span className="text-xs mt-1">Community</span>
              </div>
            </IonButton>
            
            <IonButton onClick={() => navigateTo('/profile')}>
              <div className="flex flex-col items-center">
                <User size={20} className="text-gray-500" />
                <span className="text-xs mt-1">Profile</span>
              </div>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default PlantLibraryScreen;