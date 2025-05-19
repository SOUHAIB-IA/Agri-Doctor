import React from 'react';
import { IonPage, IonContent, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthScreen: React.FC = () => {
  const history = useHistory();

  const handleGoogleSignIn = () => {
    // Handle Google sign in logic here
    history.push('/home');
  };

  return (
    <IonPage>
      <IonContent>
        <div className="h-full w-full flex flex-col items-center justify-center bg-white relative">
          {/* Plant pattern watermark */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="h-full w-full grid grid-cols-4 gap-4">
              {Array.from({ length: 16 }).map((_, index) => (
                <div key={index} className="flex items-center justify-center">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1B5E20" strokeWidth="1" className="rotate-45">
                    <path d="M12 2v8m0 0c-3.3-3.3-8-3-8 2 0 6 8 10 8 10s8-4 8-10c0-5-4.7-5.3-8-2z" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center z-10 px-8 w-full max-w-md"
          >
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl font-semibold text-primary mb-12"
            >
              Welcome to AgroScan
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-gray-600 text-center mb-8"
            >
              Sign in to start identifying and treating plant diseases instantly.
            </motion.p>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileTap={{ scale: 0.95 }}
              className="w-full"
            >
              <IonButton
                expand="block"
                className="rounded-2xl overflow-hidden h-12 shadow-md"
                style={{ 
                  '--background': 'white', 
                  '--color': '#444444', 
                  '--border-radius': '1rem', 
                  '--border-width': '1px',
                  '--border-color': '#DADCE0'
                }}
                onClick={handleGoogleSignIn}
              >
                <div className="flex items-center w-full justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" className="mr-3">
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" fill="#4285F4" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                  Continue with Google
                </div>
              </IonButton>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-xs text-gray-500 mt-12"
            >
              By continuing, you agree to our Terms of Service and Privacy Policy
            </motion.p>
          </motion.div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AuthScreen;