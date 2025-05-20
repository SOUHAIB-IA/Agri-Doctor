import React, { useState } from 'react';
import { 
  IonPage, 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons,
  IonBackButton,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

const plantTypes = [
  'Tomato', 'Potato', 'Pepper', 'Cucumber', 'Apple', 'Citrus', 
  'Corn', 'Wheat', 'Rice', 'Soybean', 'Bean', 'Lettuce', 
  'Strawberry', 'Grape', 'Other'
];

const UnknownDiseaseScreen: React.FC = () => {
  const history = useHistory();
  const [plantType, setPlantType] = useState<string>('');
  const [symptoms, setSymptoms] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');

  const handleSubmit = () => {
    // Handle form submission
    // In a real app, you'd send this data to a backend
    history.push('/home');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': 'white' , '--padding-top': 'var(--ion-safe-area-top, 0) + 16px'}}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/diagnosis" />
          </IonButtons>
          <IonTitle className="text-primary">Additional Information</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <div className="p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">Help Us Identify Your Plant's Disease</h2>
            <p className="text-gray-600 text-sm">
              Please provide additional information about your plant to help our experts identify the disease.
            </p>
          </motion.div>
          
          <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
            <div className="mb-4">
              <img 
                src="https://images.pexels.com/photos/7728070/pexels-photo-7728070.jpeg"
                alt="Plant with unknown disease" 
                className="w-full h-40 object-cover rounded-xl"
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <IonItem lines="none" className="mb-4 rounded-lg bg-gray-50">
                <IonLabel position="stacked" className="text-gray-700 font-medium">Plant Type <span className="text-red-500">*</span></IonLabel>
                <IonSelect 
                  value={plantType} 
                  onIonChange={e => setPlantType(e.detail.value)}
                  interface="popover"
                  placeholder="Select plant type"
                  className="w-full"
                >
                  {plantTypes.map((type, index) => (
                    <IonSelectOption key={index} value={type}>{type}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              
              <IonItem lines="none" className="mb-4 rounded-lg bg-gray-50">
                <IonLabel position="stacked" className="text-gray-700 font-medium">Observed Symptoms <span className="text-red-500">*</span></IonLabel>
                <IonTextarea
                  value={symptoms}
                  onIonChange={e => setSymptoms(e.detail.value!)}
                  placeholder="Describe the symptoms (spots, wilting, etc.)"
                  autoGrow={true}
                  rows={3}
                  className="w-full"
                />
              </IonItem>
              
              <IonItem lines="none" className="mb-4 rounded-lg bg-gray-50">
                <IonLabel position="stacked" className="text-gray-700 font-medium">Growing Location</IonLabel>
                <IonSelect 
                  value={location} 
                  onIonChange={e => setLocation(e.detail.value)}
                  interface="popover"
                  placeholder="Where is the plant growing?"
                  className="w-full"
                >
                  <IonSelectOption value="indoor">Indoor</IonSelectOption>
                  <IonSelectOption value="outdoor">Outdoor</IonSelectOption>
                  <IonSelectOption value="greenhouse">Greenhouse</IonSelectOption>
                </IonSelect>
              </IonItem>
              
              <IonItem lines="none" className="mb-4 rounded-lg bg-gray-50">
                <IonLabel position="stacked" className="text-gray-700 font-medium">Additional Notes</IonLabel>
                <IonTextarea
                  value={additionalNotes}
                  onIonChange={e => setAdditionalNotes(e.detail.value!)}
                  placeholder="Any other details about your plant's condition"
                  autoGrow={true}
                  rows={3}
                  className="w-full"
                />
              </IonItem>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-secondary-light p-4 rounded-2xl mb-6"
          >
            <p className="text-sm text-gray-700">
              <span className="font-semibold text-primary">Note:</span> Our experts will review your submission and provide diagnosis within 24-48 hours. You'll receive a notification once the analysis is complete.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex justify-end"
          >
            <IonButton
              disabled={!plantType || !symptoms}
              onClick={handleSubmit}
              style={{ '--background': '#1B5E20', '--border-radius': '1rem' }}
              className="w-full"
            >
              Submit for Expert Review
            </IonButton>
          </motion.div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UnknownDiseaseScreen;