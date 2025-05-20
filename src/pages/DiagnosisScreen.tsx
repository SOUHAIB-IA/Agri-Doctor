import React, { useState } from 'react';
import { 
  IonPage, 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons,
  IonBackButton,
  IonButton
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Check, BookOpen } from 'lucide-react';

const DiagnosisScreen: React.FC = () => {
  const history = useHistory();
  const [recognized, setRecognized] = useState(true);

  const handleUnknownDisease = () => {
    history.push('/unknown-disease');
  };

  const navigateToLibrary = () => {
    history.push('/plant-library');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': 'white' ,'padding-top': 'calc(var(--ion-safe-area-top) + 16px)'}}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle className="text-primary">Diagnosis Result</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <div className="p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative mb-4"
          >
            <img 
              src="https://images.pexels.com/photos/7728070/pexels-photo-7728070.jpeg"
              alt="Plant with disease" 
              className="w-full h-56 object-cover rounded-2xl shadow-md"
            />
            
            {recognized && (
              <svg className="absolute top-0 left-0 w-full h-full" preserveAspectRatio="none">
                <circle cx="30%" cy="40%" r="30" fill="rgba(244, 67, 54, 0.3)" stroke="rgba(244, 67, 54, 0.8)" strokeWidth="2" />
                <circle cx="65%" cy="65%" r="20" fill="rgba(244, 67, 54, 0.3)" stroke="rgba(244, 67, 54, 0.8)" strokeWidth="2" />
              </svg>
            )}
          </motion.div>
          
          {recognized ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white p-4 rounded-2xl shadow-md mb-4"
            >
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <AlertTriangle size={20} className="text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Late Blight</h3>
                  <div className="flex items-center">
                    <div className="h-2 w-24 bg-gray-200 rounded-full mr-2">
                      <div className="h-2 w-20 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-xs text-gray-600">84% confidence</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mb-3">
                Late blight is a disease that affects tomatoes and potatoes. It's caused by the fungus-like organism Phytophthora infestans and can rapidly kill plants.
              </p>
              
              <div className="bg-gray-50 p-3 rounded-lg mb-3">
                <h4 className="font-semibold text-primary mb-2">Recommended Treatment</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Remove and destroy infected plant parts</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Apply copper-based fungicide to healthy foliage</span>
                  </li>
                  <li className="flex items-start">
                    <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Improve air circulation around plants</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex justify-between">
                <IonButton 
                  fill="outline" 
                  size="small"
                  onClick={navigateToLibrary}
                  className="rounded-lg"
                  style={{ '--border-radius': '0.5rem' }}
                >
                  <BookOpen size={16} className="mr-1" />
                  Learn More
                </IonButton>
                
                <IonButton 
                  size="small"
                  className="rounded-lg"
                  style={{ '--background': '#1B5E20', '--border-radius': '0.5rem' }}
                >
                  Save Result
                </IonButton>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white p-4 rounded-2xl shadow-md mb-4"
            >
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle size={28} className="text-yellow-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">Disease Not Recognized</h3>
                <p className="text-sm text-gray-700 mb-4">
                  We couldn't identify the disease affecting your plant. Would you like to submit it for expert review?
                </p>
                
                <IonButton 
                  expand="block"
                  onClick={handleUnknownDisease}
                  className="rounded-lg"
                  style={{ '--background': '#1B5E20', '--border-radius': '0.5rem' }}
                >
                  Submit for Expert Review
                </IonButton>
              </div>
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-secondary-light p-4 rounded-2xl"
          >
            <h4 className="font-semibold text-primary mb-2">Prevention Tips</h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-start">
                <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Water at the base of plants, avoiding the foliage</span>
              </li>
              <li className="flex items-start">
                <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Space plants properly for good air circulation</span>
              </li>
              <li className="flex items-start">
                <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Use disease-resistant varieties when available</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DiagnosisScreen;