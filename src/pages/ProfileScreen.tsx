import React from 'react';
import { 
  IonPage, 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle,
  IonFooter,
  IonButtons, 
  IonButton,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonToggle
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Leaf, BookOpen, Users, User, Bell, Moon, LogOut,
  History, BookMarked, HelpCircle, Settings
} from 'lucide-react';

const ProfileScreen: React.FC = () => {
  const history = useHistory();
  
  const navigateTo = (path: string) => {
    history.push(path);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': 'white' }}>
          <IonTitle className="text-primary font-bold">Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <div className="bg-primary p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="w-24 h-24 rounded-full bg-white border-4 border-white overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-white font-bold text-xl mt-3">Sarah Johnson</h2>
            <p className="text-green-100 text-sm">Garden Enthusiast</p>
          </motion.div>
        </div>
        
        <div className="p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4"
          >
            <div className="grid grid-cols-3 divide-x">
              <div className="p-3 text-center">
                <p className="text-2xl font-bold text-primary">12</p>
                <p className="text-xs text-gray-600">Plants</p>
              </div>
              <div className="p-3 text-center">
                <p className="text-2xl font-bold text-primary">8</p>
                <p className="text-xs text-gray-600">Scans</p>
              </div>
              <div className="p-3 text-center">
                <p className="text-2xl font-bold text-primary">5</p>
                <p className="text-xs text-gray-600">Guides</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4"
          >
            <IonList lines="none">
              <IonItem detail={true} className="py-2">
                <div slot="start" className="w-8 h-8 rounded-full bg-secondary-light flex items-center justify-center">
                  <History size={18} className="text-primary" />
                </div>
                <IonLabel>Scan History</IonLabel>
              </IonItem>
              <IonItem detail={true} className="py-2">
                <div slot="start" className="w-8 h-8 rounded-full bg-secondary-light flex items-center justify-center">
                  <BookMarked size={18} className="text-primary" />
                </div>
                <IonLabel>Saved Plants</IonLabel>
              </IonItem>
              <IonItem detail={true} className="py-2">
                <div slot="start" className="w-8 h-8 rounded-full bg-secondary-light flex items-center justify-center">
                  <Bell size={18} className="text-primary" />
                </div>
                <IonLabel>Notifications</IonLabel>
              </IonItem>
            </IonList>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4"
          >
            <IonList lines="none">
              <IonItem className="py-2">
                <div slot="start" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Moon size={18} className="text-gray-600" />
                </div>
                <IonLabel>Dark Mode</IonLabel>
                <IonToggle slot="end" style={{ '--background-checked': '#1B5E20' }}></IonToggle>
              </IonItem>
              <IonItem detail={true} className="py-2">
                <div slot="start" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Settings size={18} className="text-gray-600" />
                </div>
                <IonLabel>Settings</IonLabel>
              </IonItem>
              <IonItem detail={true} className="py-2">
                <div slot="start" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <HelpCircle size={18} className="text-gray-600" />
                </div>
                <IonLabel>Help & Support</IonLabel>
              </IonItem>
            </IonList>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <IonButton
              expand="block"
              color="danger"
              fill="outline"
              className="rounded-xl"
              style={{ '--border-radius': '0.75rem' }}
            >
              <LogOut size={18} className="mr-2" />
              Sign Out
            </IonButton>
          </motion.div>
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
                <BookOpen size={20} className="text-gray-500" />
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
                <User size={20} className="text-primary" />
                <span className="text-xs mt-1">Profile</span>
              </div>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default ProfileScreen;