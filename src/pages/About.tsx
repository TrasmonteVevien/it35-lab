import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonModal,
  IonButton,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';

import {
  mailOutline,
  shieldCheckmarkOutline,
  informationCircleOutline,
  documentTextOutline,
  codeSlashOutline
} from 'ionicons/icons';

import React, { useState } from 'react';

const About: React.FC = () => {
  const [showBestPracticesModal, setShowBestPracticesModal] = useState(false);
  const [showResourcesModal, setShowResourcesModal] = useState(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>About App Development</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding" color="light">
        {/* Introduction Section */}
        <IonCard color="primary">
          <IonCardHeader>
            <IonCardTitle>App Development with Ionic</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            This app showcases a modern development stack using <strong>Ionic Framework</strong>, <strong>React</strong>, <strong>JavaScript</strong>, and <strong>Supabase</strong> for backend services. GitHub is used for version control and collaboration.
          </IonCardContent>
        </IonCard>

        {/* Features Section */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Features</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <ul>
              <li><strong>Cross-platform support:</strong> Built using Ionic, ensuring compatibility across iOS, Android, and the web.</li>
              <li><strong>Real-time data:</strong> Backend powered by Supabase with live data synchronization.</li>
              <li><strong>Secure authentication:</strong> Built-in user authentication with Supabase Auth.</li>
              <li><strong>Modular components:</strong> Easy-to-use, reusable components for faster development.</li>
            </ul>
          </IonCardContent>
        </IonCard>

        {/* Description Section */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Description</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            The app is designed to demonstrate modern app development practices and provide an easy-to-use interface for users. It offers a seamless experience by leveraging the best features of Ionic and React, ensuring both functionality and performance.
          </IonCardContent>
        </IonCard>

        {/* Functionality Section */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Functionality</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            The app allows users to:
            <ul>
              <li>Register and log in with secure authentication.</li>
              <li>View and interact with various features provided by the app.</li>
              <li>Access valuable resources and development best practices.</li>
            </ul>
          </IonCardContent>
        </IonCard>

        {/* App Information List */}
        <IonList>
          <IonItem>
            <IonIcon icon={informationCircleOutline} slot="start" />
            <IonLabel>
              <h2>App Version</h2>
              <p>1.0.0</p>
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon icon={mailOutline} slot="start" />
            <IonLabel>
              <h2>Developer Contact</h2>
              <p>developer@appdev.io</p>
            </IonLabel>
          </IonItem>

          <IonItem button onClick={() => setShowBestPracticesModal(true)}>
            <IonIcon icon={shieldCheckmarkOutline} slot="start" />
            <IonLabel>
              <h2>Best Practices</h2>
              <p>View recommended development standards</p>
            </IonLabel>
          </IonItem>

          <IonItem button onClick={() => setShowResourcesModal(true)}>
            <IonIcon icon={documentTextOutline} slot="start" />
            <IonLabel>
              <h2>Resources</h2>
              <p>Check out the tools used</p>
            </IonLabel>
          </IonItem>
        </IonList>

        {/* Learn More Button */}
        <IonGrid>
          <IonRow className="ion-justify-content-center ion-padding-top">
            <IonCol size="auto">
              <IonButton color="dark">
                <IonIcon icon={codeSlashOutline} slot="start" />
                Learn More
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Best Practices Modal */}
        <IonModal isOpen={showBestPracticesModal} onDidDismiss={() => setShowBestPracticesModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Best Practices</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowBestPracticesModal(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonCardContent>
              <ul>
                <li>Use modular and reusable components</li>
                <li>Keep UI responsive and accessible</li>
                <li>Write clean, commented code</li>
                <li>Version control with GitHub</li>
                <li>Secure API connections and user data</li>
              </ul>
            </IonCardContent>
          </IonContent>
        </IonModal>

        {/* Resources Modal */}
        <IonModal isOpen={showResourcesModal} onDidDismiss={() => setShowResourcesModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Resources</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowResourcesModal(false)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonCardContent>
              <ul>
                <li><strong>Ionic</strong> - Cross-platform UI toolkit</li>
                <li><strong>React</strong> - UI library for components</li>
                <li><strong>JavaScript</strong> - Logic and interactivity</li>
                <li><strong>Supabase</strong> - Backend as a service (Auth, DB, APIs)</li>
                <li><strong>GitHub</strong> - Version control and project management</li>
              </ul>
            </IonCardContent>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default About;
