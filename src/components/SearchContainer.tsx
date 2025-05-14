import { useState, useEffect } from 'react';
import {
  IonContent,
  IonInput,
  IonLabel,
  IonButton,
  IonList,
  IonItem,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonModal,
  IonFooter,
  IonToolbar,
  IonTitle,
  IonHeader,
  IonButtons,
  IonIcon,
} from '@ionic/react';

const SearchContainer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [steps, setSteps] = useState<any[]>([]);
  const [practices, setPractices] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [filteredSteps, setFilteredSteps] = useState<any[]>([]);
  const [filteredPractices, setFilteredPractices] = useState<any[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<any[]>([]);
  const [filteredResources, setFilteredResources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  const [showSteps, setShowSteps] = useState(false);
  const [showPractices, setShowPractices] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showResources, setShowResources] = useState(false);

  // Fetching initial data
  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);

      const fetchedSteps = [
        'Ideation and Planning',
        'Research and Market Analysis',
        'Wireframing and Prototyping',
        'Tech Stack Selection',
        'Development',
        'Testing',
        'Launch',
      ];

      const fetchedPractices = [
        'User-Centered Design',
        'Agile Development',
        'Continuous Integration and Testing',
        'Version Control (Git)',
        'App Performance Optimization',
        'Security Best Practices',
      ];

      const fetchedSkills = [
        'Frontend Development (React, Vue)',
        'Backend Development (Node.js, Python)',
        'UI/UX Design',
        'API Development',
        'Database Management',
        'Testing and Debugging',
      ];

      const fetchedResources = [
        'freeCodeCamp (Online tutorials)',
        'Codecademy (Coding courses)',
        'GitHub (Version control and open-source code)',
        'Stack Overflow (Developer community)',
        'Figma (Design tool)',
        'MDN Web Docs (Web development documentation)',
      ];

      setSteps(fetchedSteps);
      setPractices(fetchedPractices);
      setSkills(fetchedSkills);
      setResources(fetchedResources);

      setFilteredSteps(fetchedSteps);
      setFilteredPractices(fetchedPractices);
      setFilteredSkills(fetchedSkills);
      setFilteredResources(fetchedResources);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Filter the content based on the search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredSteps(steps);
      setFilteredPractices(practices);
      setFilteredSkills(skills);
      setFilteredResources(resources);
    } else {
      setFilteredSteps(
        steps.filter((step) => step.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredPractices(
        practices.filter((practice) => practice.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredSkills(
        skills.filter((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredResources(
        resources.filter((resource) => resource.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
  }, [searchTerm, steps, practices, skills, resources]);

  // Handle opening the modal with item details
  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  return (
    <IonContent>
      <IonLabel style={{ fontSize: '20px', marginBottom: '10px' }}>
        Learn More About App Development
      </IonLabel>
      <IonInput
        value={searchTerm}
        onIonInput={(e) => setSearchTerm(e.detail.value!)}
        placeholder="Search for a step, practice, skill, or resource"
        debounce={500}
        style={{ marginBottom: '20px', paddingLeft: '10px', fontSize: '16px' }}
      />

      {isLoading && <IonText>Loading...</IonText>}

      {/* View Content Button */}
      <IonButton onClick={() => setShowSteps(!showSteps)}>View Steps</IonButton>
      <IonButton onClick={() => setShowPractices(!showPractices)}>View Best Practices</IonButton>
      <IonButton onClick={() => setShowSkills(!showSkills)}>View Skills</IonButton>
      <IonButton onClick={() => setShowResources(!showResources)}>View Resources</IonButton>

      <IonList>
        {showSteps && filteredSteps.length > 0 && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Steps</IonCardTitle>
            </IonCardHeader>
            {filteredSteps.map((step, index) => (
              <IonItem key={index} onClick={() => handleItemClick(step)}>
                <IonLabel>{step}</IonLabel>
              </IonItem>
            ))}
          </IonCard>
        )}

        {showPractices && filteredPractices.length > 0 && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Best Practices</IonCardTitle>
            </IonCardHeader>
            {filteredPractices.map((practice, index) => (
              <IonItem key={index} onClick={() => handleItemClick(practice)}>
                <IonLabel>{practice}</IonLabel>
              </IonItem>
            ))}
          </IonCard>
        )}

        {showSkills && filteredSkills.length > 0 && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Skills</IonCardTitle>
            </IonCardHeader>
            {filteredSkills.map((skill, index) => (
              <IonItem key={index} onClick={() => handleItemClick(skill)}>
                <IonLabel>{skill}</IonLabel>
              </IonItem>
            ))}
          </IonCard>
        )}

        {showResources && filteredResources.length > 0 && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Resources</IonCardTitle>
            </IonCardHeader>
            {filteredResources.map((resource, index) => (
              <IonItem key={index} onClick={() => handleItemClick(resource)}>
                <IonLabel>{resource}</IonLabel>
              </IonItem>
            ))}
          </IonCard>
        )}

        {filteredSteps.length === 0 &&
          filteredPractices.length === 0 &&
          filteredSkills.length === 0 &&
          filteredResources.length === 0 && (
            <IonText>No results found</IonText>
          )}
      </IonList>

      <IonButton onClick={() => setSearchTerm('')}>Clear Search</IonButton>

      {/* Modal to display selected content */}
      <IonModal isOpen={modalOpen} onDidDismiss={() => setModalOpen(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Item Details</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setModalOpen(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardContent>
              <IonText>{selectedItem}</IonText>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonModal>
    </IonContent>
  );
};

export default SearchContainer;
