import React, { useEffect } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

const SplashScreen: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    // Auto navigate to auth screen after 3 seconds
    const timer = setTimeout(() => {
      history.push('/auth');
    }, 3000);

    return () => clearTimeout(timer);
  }, [history]);

  return (
    <IonPage>
      <IonContent>
        <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-b from-secondary-light to-white">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center justify-center bg-primary rounded-full p-5 mb-4 shadow-lg">
              <Leaf size={64} className="text-white" />
            </div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl font-bold text-primary mt-4 mb-3"
            >
              AgroScan
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-gray-600 text-center px-4"
            >
              Plant Disease Detection
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1.5 }}
            className="w-48 h-1 bg-primary-300 rounded-full mt-8"
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 1, duration: 2, repeat: Infinity }}
            className="text-sm text-gray-500 mt-4"
          >
            Detecting plant health...
          </motion.p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SplashScreen;