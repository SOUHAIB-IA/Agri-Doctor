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
  IonFab,
  IonFabButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonLabel
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, BookOpen, Users, User, MessageCircle, ThumbsUp, MessageSquare, PenLine } from 'lucide-react';

// Sample post data
const posts = [
  {
    id: 1,
    author: 'GardenGuru',
    authorImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    time: '2h ago',
    content: 'Just spotted some early signs of powdery mildew on my zucchini plants. Anyone have organic treatment recommendations?',
    likes: 12,
    comments: 8,
    image: 'https://images.pexels.com/photos/1674666/pexels-photo-1674666.jpeg'
  },
  {
    id: 2,
    author: 'PlantWhisperer',
    authorImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    time: '5h ago',
    content: 'Success story! My tomatoes recovered from early blight thanks to the advice from this community. Here\'s the before and after!',
    likes: 24,
    comments: 5,
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg'
  }
];

const CommunityScreen: React.FC = () => {
  const history = useHistory();
  
  const navigateTo = (path: string) => {
    history.push(path);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar style={{ '--background': 'white' }}>
          <IonTitle className="text-primary font-bold">Community</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <div className="px-4 py-2">
          <IonSegment value="recent" className="mb-4 rounded-lg bg-gray-100 p-1">
            <IonSegmentButton value="recent" className="rounded-md">
              <IonLabel>Recent</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="popular" className="rounded-md">
              <IonLabel>Popular</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="my-posts" className="rounded-md">
              <IonLabel>My Posts</IonLabel>
            </IonSegmentButton>
          </IonSegment>
          
          <div className="space-y-4">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <img 
                      src={post.authorImage} 
                      alt={post.author} 
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">{post.author}</h3>
                      <p className="text-xs text-gray-500">{post.time}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{post.content}</p>
                  
                  {post.image && (
                    <div className="mb-3 rounded-xl overflow-hidden">
                      <img 
                        src={post.image} 
                        alt="Post image" 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm text-gray-600 border-t pt-3">
                    <div className="flex items-center">
                      <ThumbsUp size={16} className="mr-1" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare size={16} className="mr-1" />
                      <span>{post.comments} comments</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex border-t divide-x">
                  <button className="flex-1 py-2 flex items-center justify-center text-gray-600">
                    <ThumbsUp size={18} className="mr-2" />
                    <span>Like</span>
                  </button>
                  <button className="flex-1 py-2 flex items-center justify-center text-gray-600">
                    <MessageCircle size={18} className="mr-2" />
                    <span>Comment</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton style={{ '--background': '#1B5E20' }}>
            <PenLine />
          </IonFabButton>
        </IonFab>
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
                <Users size={20} className="text-primary" />
                <span className="text-xs mt-1">Community</span>
              </div>
            </IonButton>
            
            <IonButton onClick={() => navigateTo('/profile')}>
              <div className="flex flex-col items-center">
                <User size={20} className="text-gray-500" />
                <span className="text-xs mt-1">Profile</span>
              </div>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default CommunityScreen;