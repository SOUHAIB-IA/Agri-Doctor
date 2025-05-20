"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonFooter,
  IonButtons,
  IonToast,
  IonSpinner,
} from "@ionic/react"
import { useHistory } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, Upload, Leaf, BookOpen, Users, User, AlertTriangle, ChevronRight, Sparkles } from "lucide-react"
import { Camera as CapacitorCamera, CameraResultType, CameraSource } from "@capacitor/camera"

const HomeScreen: React.FC = () => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [activeTab, setActiveTab] = useState("home")
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    // Hide welcome message after 2 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  const takePicture = async () => {
    try {
      setIsLoading(true)
      const image = await CapacitorCamera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      })

      // Pass the image URI to the diagnosis page
      history.push({
        pathname: "/diagnosis",
        state: { imageUri: image.webPath },
      })
    } catch (error) {
      console.error("Camera error:", error)
      setToastMessage("Could not access camera. Please check permissions.")
      setShowToast(true)
    } finally {
      setIsLoading(false)
    }
  }

  const uploadImage = async () => {
    try {
      setIsLoading(true)
      const image = await CapacitorCamera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
      })

      // Pass the image URI to the diagnosis page
      history.push({
        pathname: "/diagnosis",
        state: { imageUri: image.webPath },
      })
    } catch (error) {
      console.error("Upload error:", error)
      setToastMessage("Could not upload image. Please try again.")
      setShowToast(true)
    } finally {
      setIsLoading(false)
    }
  }

  const navigateTo = (path: string, tab: string) => {
    setActiveTab(tab)
    history.push(path)
  }

  return (
    <IonPage>
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 z-0"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-green-200 to-transparent rounded-full filter blur-3xl opacity-20 -translate-y-20 translate-x-20 z-0"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-200 to-transparent rounded-full filter blur-3xl opacity-20 translate-y-20 -translate-x-20 z-0"></div>

      <IonHeader className="ion-no-border">
        <IonToolbar className="bg-transparent" style={{ paddingTop: "calc(var(--ion-safe-area-top) + 16px)" }}>
          <div className="px-4 pt-safe pt-6 pb-2 flex items-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mr-2"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
            <Leaf size={20} className="text-white" />
          </div>
        </motion.div>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="font-bold text-transparent text-xl bg-clip-text bg-gradient-to-r from-green-600 to-emerald-700">
            AgroScan
          </h1>
        </motion.div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="bg-transparent ion-padding-bottom" scrollY={true}>
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="absolute top-20 left-0 right-0 z-50 flex justify-center"
            >
              <div className="bg-white bg-opacity-80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg flex items-center">
                <Sparkles size={18} className="text-green-500 mr-2" />
                <p className="text-green-800 font-medium">Welcome to AgroScan</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="px-4 py-2 flex flex-col relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 mt-2"
          >
            <h2 className="text-2xl font-bold text-gray-800">Let's Diagnose Your Plant</h2>
            <p className="text-gray-600 mt-2">Take a photo or upload an image to identify plant diseases instantly.</p>
          </motion.div>

          <IonGrid className="flex-grow">
            <IonRow>
              <IonCol size="6" className="flex flex-col items-center justify-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95 }}
                  className="mb-4 relative"
                  onClick={takePicture}
                >
                  <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-white opacity-20 rounded-full scale-150 translate-x-10 -translate-y-10"></div>
                    <div className="absolute inset-0 bg-black opacity-5"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <Camera size={40} className="text-white mb-2" />
                      <span className="text-white text-sm font-medium">Capture</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 inset-x-0 h-8 bg-gradient-to-t from-black to-transparent opacity-10 blur-md rounded-b-3xl"></div>
                </motion.div>
              </IonCol>

              <IonCol size="6" className="flex flex-col items-center justify-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.95 }}
                  className="mb-4 relative"
                  onClick={uploadImage}
                >
                  <div className="w-32 h-32 bg-white backdrop-blur-lg rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden border border-emerald-100">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-100 opacity-70"></div>
                    <div className="absolute inset-0 bg-black opacity-5"></div>
                    <div className="relative z-10 flex flex-col items-center">
                      <Upload size={40} className="text-emerald-600 mb-2" />
                      <span className="text-emerald-700 text-sm font-medium">Upload</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 inset-x-0 h-8 bg-gradient-to-t from-black to-transparent opacity-5 blur-md rounded-b-3xl"></div>
                </motion.div>
              </IonCol>
            </IonRow>

            <IonRow className="mt-8">
              <IonCol size="12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="bg-white bg-opacity-70 backdrop-blur-md p-5 rounded-3xl shadow-lg border border-amber-100 overflow-hidden relative"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-100 to-transparent rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
                  <div className="flex items-start relative z-10">
                    <div className="bg-amber-100 p-2 rounded-xl mr-3 shadow-sm">
                      <AlertTriangle size={20} className="text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-amber-800 font-semibold mb-1">Latest Disease Alert</h3>
                      <p className="text-sm text-gray-700">
                        Tomato Late Blight reported in your region. Check your plants regularly.
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end relative z-10">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center text-amber-700 text-sm font-medium bg-amber-50 px-3 py-1.5 rounded-full"
                      onClick={() => navigateTo("/plant-library", "library")}
                    >
                      <span className="mr-1">Learn more</span>
                      <ChevronRight size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              </IonCol>
            </IonRow>

            <IonRow className="mt-8">
              <IonCol size="12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="bg-white bg-opacity-60 backdrop-blur-md p-4 rounded-3xl shadow-sm border border-green-100"
                >
                  <h3 className="text-green-800 font-semibold mb-2 text-sm">Recent Scans</h3>
                  <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                    {[1, 2, 3].map((item) => (
                      <motion.div
                        key={item}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-green-500 opacity-10"></div>
                        <Leaf size={24} className="text-green-600" />
                      </motion.div>
                    ))}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center border border-dashed border-green-300"
                    >
                      <Camera size={24} className="text-green-500" />
                    </motion.div>
                  </div>
                </motion.div>
              </IonCol>
            </IonRow>
          </IonGrid>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-auto text-center"
          >
            <p className="text-xs text-gray-500">Powered by Ionic React & AI</p>
          </motion.div>
        </div>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white bg-opacity-90 backdrop-blur-md p-6 rounded-2xl shadow-xl flex flex-col items-center"
            >
              <div className="w-16 h-16 relative">
                <IonSpinner name="crescent" className="text-green-600 w-full h-full absolute" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Leaf size={20} className="text-green-600 opacity-50" />
                </div>
              </div>
              <p className="mt-4 text-gray-700 font-medium">Processing...</p>
            </motion.div>
          </motion.div>
        )}

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          position="top"
          color="danger"
        />
      </IonContent>

      <IonFooter className="ion-no-border">
        <div className="bg-white bg-opacity-80 backdrop-blur-md shadow-lg border-t border-gray-100">
          <IonButtons className="flex justify-around py-2">
            <motion.div
              whileTap={{ scale: 0.9 }}
              onClick={() => navigateTo("/home", "home")}
              className="flex flex-col items-center"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-1 ${
                  activeTab === "home"
                    ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-md shadow-green-200"
                    : "bg-gray-50"
                }`}
              >
                <Leaf size={22} className={activeTab === "home" ? "text-white" : "text-gray-500"} />
              </div>
              <span className={`text-xs font-medium ${activeTab === "home" ? "text-green-600" : "text-gray-500"}`}>
                Home
              </span>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.9 }}
              onClick={() => navigateTo("/plant-library", "library")}
              className="flex flex-col items-center"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-1 ${
                  activeTab === "library"
                    ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-md shadow-green-200"
                    : "bg-gray-50"
                }`}
              >
                <BookOpen size={22} className={activeTab === "library" ? "text-white" : "text-gray-500"} />
              </div>
              <span className={`text-xs font-medium ${activeTab === "library" ? "text-green-600" : "text-gray-500"}`}>
                Library
              </span>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.9 }}
              onClick={() => navigateTo("/community", "community")}
              className="flex flex-col items-center"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-1 ${
                  activeTab === "community"
                    ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-md shadow-green-200"
                    : "bg-gray-50"
                }`}
              >
                <Users size={22} className={activeTab === "community" ? "text-white" : "text-gray-500"} />
              </div>
              <span className={`text-xs font-medium ${activeTab === "community" ? "text-green-600" : "text-gray-500"}`}>
                Community
              </span>
            </motion.div>

            <motion.div
              whileTap={{ scale: 0.9 }}
              onClick={() => navigateTo("/profile", "profile")}
              className="flex flex-col items-center"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-1 ${
                  activeTab === "profile"
                    ? "bg-gradient-to-br from-green-500 to-emerald-600 shadow-md shadow-green-200"
                    : "bg-gray-50"
                }`}
              >
                <User size={22} className={activeTab === "profile" ? "text-white" : "text-gray-500"} />
              </div>
              <span className={`text-xs font-medium ${activeTab === "profile" ? "text-green-600" : "text-gray-500"}`}>
                Profile
              </span>
            </motion.div>
          </IonButtons>
        </div>
      </IonFooter>
    </IonPage>
  )
}

export default HomeScreen