import React from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';

/* Import Ionic styles */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Import pages */
import SplashScreen from './pages/SplashScreen';
import AuthScreen from './pages/AuthScreen';
import HomeScreen from './pages/HomeScreen';
import DiagnosisScreen from './pages/DiagnosisScreen';
import UnknownDiseaseScreen from './pages/UnknownDiseaseScreen';
import PlantLibraryScreen from './pages/PlantLibraryScreen';
import CommunityScreen from './pages/CommunityScreen';
import ProfileScreen from './pages/ProfileScreen';

/* Import custom styles */
import './index.css';

setupIonicReact();

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/splash" component={SplashScreen} />
          <Route exact path="/auth" component={AuthScreen} />
          <Route exact path="/home" component={HomeScreen} />
          <Route exact path="/diagnosis" component={DiagnosisScreen} />
          <Route exact path="/unknown-disease" component={UnknownDiseaseScreen} />
          <Route exact path="/plant-library" component={PlantLibraryScreen} />
          <Route exact path="/community" component={CommunityScreen} />
          <Route exact path="/profile" component={ProfileScreen} />
          <Redirect exact from="/" to="/splash" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;