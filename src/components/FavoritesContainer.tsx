import { useState, useEffect } from 'react'; 
import {
  IonApp, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton,
  IonInput, IonLabel, IonModal, IonFooter, IonCard, IonCardContent, IonCardHeader,
  IonCardTitle, IonAlert, IonIcon, IonAvatar
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';
import { pencil, trash, star, starOutline } from 'ionicons/icons';

interface Feedback {
  id: string;
  user_id: string;
  description: string;
  rating: number;
  created_at: string;
  updated_at: string;
  favorite: boolean; // Added favorite status
}

const FeedbackContainer: React.FC = () => {
  const [entries, setEntries] = useState<Feedback[]>([]);
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [editing, setEditing] = useState<Feedback | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null); // New state for Avatar
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        const avatar = user.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email || 'User')}`;
        setAvatarUrl(avatar);
      }
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    const fetchEntries = async () => {
      if (!userId) return;
      const { data, error } = await supabase
        .from('app_dev_feedback')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (!error && data) setEntries(data as Feedback[]);
    };
    fetchEntries();
  }, [userId]);

  const createEntry = async () => {
    if (!description.trim() || !rating || !userId) return;

    setPosting(true);
    try {
      const { data, error } = await supabase.from('app_dev_feedback').insert([{
        description,
        rating: parseInt(rating),
        user_id: userId,
        favorite: false // Default favorite is false
      }]).select('*');

      if (!error && data) {
        setEntries([data[0] as Feedback, ...entries]);
        setDescription('');
        setRating('');
      }
    } finally {
      setPosting(false);
    }
  };

  const startEditing = (entry: Feedback) => {
    setEditing(entry);
    setDescription(entry.description);
    setRating(entry.rating.toString());
    setIsModalOpen(true);
  };

  const saveEntry = async () => {
    if (!editing) return;

    const { data, error } = await supabase.from('app_dev_feedback').update({
      description,
      rating: parseInt(rating)
    }).match({ id: editing.id }).select('*');

    if (!error && data) {
      const updated = data[0] as Feedback;
      setEntries(entries.map(entry => entry.id === updated.id ? updated : entry));
      setDescription('');
      setRating('');
      setEditing(null);
      setIsModalOpen(false);
      setIsAlertOpen(true);
    }
  };

  const confirmDeleteEntry = (id: string) => {
    setDeleteId(id);
    setConfirmDelete(true);
  };

  const deleteEntry = async () => {
    if (!deleteId) return;

    const { error } = await supabase.from('app_dev_feedback').delete().match({ id: deleteId });
    if (!error) {
      setEntries(entries.filter(entry => entry.id !== deleteId));
    }
    setDeleteId(null);
    setConfirmDelete(false);
  };

  const toggleFavorite = async (id: string, isFavorite: boolean) => {
    const { error } = await supabase
      .from('app_dev_feedback')
      .update({ favorite: !isFavorite })
      .match({ id });

    if (error) {
      console.error('Error updating favorite status:', error.message);
    } else {
      setEntries(entries.map(entry =>
        entry.id === id ? { ...entry, favorite: !isFavorite } : entry
      ));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
    setDescription('');
    setRating('');
  };

  return (
    <IonApp>
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IonTitle style={{ color: 'white' }}>What I Like About App Dev</IonTitle>
            {avatarUrl && (
              <IonAvatar slot="end" style={{ marginRight: '1rem' }}>
                <img src={avatarUrl} alt="User Avatar" />
              </IonAvatar>
            )}
          </IonToolbar>
        </IonHeader>

        <IonContent style={{ '--background': '#000' }}>
          <IonCard style={{ backgroundColor: '#0d1117', color: 'white' }}>
            <IonCardHeader>
              <IonCardTitle style={{ color: '#61dafb' }}>Share Your Thoughts</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonInput
                value={description}
                onIonChange={e => setDescription(e.detail.value!)}
                placeholder="E.g., I love problem solving..."
                style={{ color: 'white' }}
              />
              <IonInput
                type="number"
                min="1"
                max="10"
                value={rating}
                onIonChange={e => setRating(e.detail.value!)}
                placeholder="Rating (1-10)"
                style={{ marginTop: '10px', color: 'white' }}
              />
            </IonCardContent>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0.5rem' }}>
              <IonButton
                onClick={createEntry}
                disabled={!description || !rating}
                style={{
                  backgroundColor: posting ? '#007bff' : undefined,
                  color: posting ? 'white' : undefined
                }}
              >
                Post
              </IonButton>
            </div>
          </IonCard>

          {entries.map(entry => (
            <IonCard key={entry.id} style={{ marginTop: '1rem', backgroundColor: '#0d1117', color: 'white' }}>
              <IonCardHeader>
                <IonCardTitle style={{ color: '#61dafb' }}>Rating: {entry.rating}/10</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonLabel style={{ color: 'white' }}>{entry.description}</IonLabel>
              </IonCardContent>
              <IonButton fill="clear" color="light" onClick={() => startEditing(entry)}>
                <IonIcon icon={pencil} />
              </IonButton>
              <IonButton fill="clear" color="danger" onClick={() => confirmDeleteEntry(entry.id)}>
                <IonIcon icon={trash} />
              </IonButton>
              <IonButton
                fill="clear"
                color={entry.favorite ? 'warning' : 'medium'}
                onClick={() => toggleFavorite(entry.id, entry.favorite)}
              >
                <IonIcon icon={entry.favorite ? star : starOutline} />
              </IonButton>
            </IonCard>
          ))}
        </IonContent>

        <IonModal isOpen={isModalOpen} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle style={{ color: 'white' }}>Edit Feedback</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent style={{ '--background': '#000', padding: '1rem' }}>
            <IonInput
              value={description}
              onIonChange={e => setDescription(e.detail.value!)}
              placeholder="Edit description"
              style={{ color: 'white' }}
            />
            <IonInput
              type="number"
              min="1"
              max="10"
              value={rating}
              onIonChange={e => setRating(e.detail.value!)}
              placeholder="Edit rating (1-10)"
              style={{ marginTop: '10px', color: 'white' }}
            />
          </IonContent>
          <IonFooter style={{ display: 'flex', justifyContent: 'space-around', padding: '1rem' }}>
            <IonButton color="primary" onClick={saveEntry}>Save</IonButton>
            <IonButton onClick={closeModal} color="medium">Cancel</IonButton>
          </IonFooter>
        </IonModal>

        <IonAlert
          isOpen={isAlertOpen}
          onDidDismiss={() => setIsAlertOpen(false)}
          header="Success"
          message="Feedback updated!"
          buttons={['OK']}
        />

        <IonAlert
          isOpen={confirmDelete}
          onDidDismiss={() => setConfirmDelete(false)}
          header="Confirm Delete"
          message="Are you sure you want to delete this feedback?"
          buttons={[
            { text: 'Cancel', role: 'cancel' },
            { text: 'Delete', handler: deleteEntry }
          ]}
        />
      </IonPage>
    </IonApp>
  );
};

export default FeedbackContainer;
