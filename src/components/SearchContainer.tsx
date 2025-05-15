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
  IonToast,
  IonSpinner,
} from '@ionic/react';
import { heart, heartOutline } from 'ionicons/icons';

interface Item {
  title: string;
  description: string;
}

const SearchContainer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [steps, setSteps] = useState<Item[]>([]);
  const [practices, setPractices] = useState<Item[]>([]);
  const [skills, setSkills] = useState<Item[]>([]);
  const [resources, setResources] = useState<Item[]>([]);
  const [filteredSteps, setFilteredSteps] = useState<Item[]>([]);
  const [filteredPractices, setFilteredPractices] = useState<Item[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<Item[]>([]);
  const [filteredResources, setFilteredResources] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [showSteps, setShowSteps] = useState(false);
  const [showPractices, setShowPractices] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [showResources, setShowResources] = useState(false);

  const [activeCategories, setActiveCategories] = useState<string[]>([
    'steps',
    'practices',
    'skills',
    'resources',
  ]);

  useEffect(() => {
    const savedSearch = localStorage.getItem('searchTerm');
    if (savedSearch) setSearchTerm(savedSearch);
  }, []);

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  const fetchData = () => {
    setIsLoading(true);
    const fetchedSteps: Item[] = [
      { title: 'Ideation and Planning', description: 'Define your app concept, target users, and features.' },
      { title: 'Research and Market Analysis', description: 'Analyze market trends and competitors.' },
      { title: 'Wireframing and Prototyping', description: 'Create low-fidelity and high-fidelity designs.' },
      { title: 'Tech Stack Selection', description: 'Choose tools and technologies for your app.' },
      { title: 'Development', description: 'Begin coding the frontend and backend of the app.' },
      { title: 'Testing', description: 'Perform manual and automated testing to fix bugs.' },
      { title: 'Launch', description: 'Deploy your app to production environments.' },
    ];
    const fetchedPractices: Item[] = [
      { title: 'User-Centered Design', description: 'Design with the end user in mind for better UX.' },
      { title: 'Agile Development', description: 'Iterative approach for adaptive planning and delivery.' },
      { title: 'Continuous Integration and Testing', description: 'Automatically build and test with each commit.' },
      { title: 'Version Control (Git)', description: 'Track code changes and collaborate using Git.' },
      { title: 'App Performance Optimization', description: 'Improve loading time and responsiveness.' },
      { title: 'Security Best Practices', description: 'Prevent attacks and protect user data.' },
    ];
    const fetchedSkills: Item[] = [
      { title: 'Frontend Development (React, Vue)', description: 'Building user interfaces using modern JS frameworks.' },
      { title: 'Backend Development (Node.js, Python)', description: 'Create server logic and APIs.' },
      { title: 'UI/UX Design', description: 'Focus on visual and experience aspects of apps.' },
      { title: 'API Development', description: 'Design and build RESTful or GraphQL APIs.' },
      { title: 'Database Management', description: 'Work with SQL/NoSQL databases like MySQL or MongoDB.' },
      { title: 'Testing and Debugging', description: 'Ensure quality through tests and troubleshooting.' },
    ];
    const fetchedResources: Item[] = [
      { title: 'freeCodeCamp', description: 'Free interactive coding tutorials and certification.' },
      { title: 'Codecademy', description: 'Interactive courses on web and app development.' },
      { title: 'GitHub', description: 'Host and collaborate on code projects.' },
      { title: 'Stack Overflow', description: 'Community for asking and answering coding questions.' },
      { title: 'Figma', description: 'Collaborative UI/UX design tool for wireframes and prototypes.' },
      { title: 'MDN Web Docs', description: 'Comprehensive documentation for web technologies.' },
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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    setFilteredSteps(
      activeCategories.includes('steps')
        ? steps.filter((item) => item.title.toLowerCase().includes(lowerTerm))
        : []
    );
    setFilteredPractices(
      activeCategories.includes('practices')
        ? practices.filter((item) => item.title.toLowerCase().includes(lowerTerm))
        : []
    );
    setFilteredSkills(
      activeCategories.includes('skills')
        ? skills.filter((item) => item.title.toLowerCase().includes(lowerTerm))
        : []
    );
    setFilteredResources(
      activeCategories.includes('resources')
        ? resources.filter((item) => item.title.toLowerCase().includes(lowerTerm))
        : []
    );
  }, [searchTerm, steps, practices, skills, resources, activeCategories]);

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const toggleFavorite = (title: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(title) ? prev.filter((i) => i !== title) : [...prev, title];
      setToastMessage(prev.includes(title) ? 'Removed from favorites' : 'Added to favorites');
      setShowToast(true);
      return updated;
    });
  };

  const toggleAll = () => {
    const toggle = !(showSteps && showPractices && showSkills && showResources);
    setShowSteps(toggle);
    setShowPractices(toggle);
    setShowSkills(toggle);
    setShowResources(toggle);
  };

  const renderItem = (item: Item, index: number) => (
    <IonItem key={index} onClick={() => handleItemClick(item)}>
      <IonLabel>{item.title}</IonLabel>
      <IonButton
        fill="clear"
        slot="end"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(item.title);
        }}
      >
        <IonIcon icon={favorites.includes(item.title) ? heart : heartOutline} />
      </IonButton>
    </IonItem>
  );

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

      {isLoading ? <IonSpinner name="dots" /> : null}

      <IonButton onClick={toggleAll}>
        {showSteps && showPractices && showSkills && showResources ? 'Hide All' : 'Show All'}
      </IonButton>
      <IonButton onClick={() => setShowSteps(!showSteps)}>
        View Steps ({filteredSteps.length})
      </IonButton>
      <IonButton onClick={() => setShowPractices(!showPractices)}>
        View Best Practices ({filteredPractices.length})
      </IonButton>
      <IonButton onClick={() => setShowSkills(!showSkills)}>
        View Skills ({filteredSkills.length})
      </IonButton>
      <IonButton onClick={() => setShowResources(!showResources)}>
        View Resources ({filteredResources.length})
      </IonButton>

      <IonList>
        {showSteps && filteredSteps.length > 0 && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Steps</IonCardTitle>
            </IonCardHeader>
            {filteredSteps.map(renderItem)}
          </IonCard>
        )}

        {showPractices && filteredPractices.length > 0 && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Best Practices</IonCardTitle>
            </IonCardHeader>
            {filteredPractices.map(renderItem)}
          </IonCard>
        )}

        {showSkills && filteredSkills.length > 0 && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Skills</IonCardTitle>
            </IonCardHeader>
            {filteredSkills.map(renderItem)}
          </IonCard>
        )}

        {showResources && filteredResources.length > 0 && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Resources</IonCardTitle>
            </IonCardHeader>
            {filteredResources.map(renderItem)}
          </IonCard>
        )}

        {filteredSteps.length === 0 &&
          filteredPractices.length === 0 &&
          filteredSkills.length === 0 &&
          filteredResources.length === 0 &&
          !isLoading && <IonText>No results found</IonText>}
      </IonList>

      <IonButton onClick={() => setSearchTerm('')}>Clear Search</IonButton>

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
            <IonCardHeader>
              <IonCardTitle>{selectedItem?.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText>{selectedItem?.description}</IonText>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonModal>

      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message={toastMessage}
        duration={1500}
        color="primary"
      />
    </IonContent>
  );
};

export default SearchContainer;
