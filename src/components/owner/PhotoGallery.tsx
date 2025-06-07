
import { useState } from "react";
import { Camera, Upload, Trash2, Edit, Eye, Star, Tag } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Photo {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
  isBeforeAfter: boolean;
  beforeUrl?: string;
  afterUrl?: string;
  likes: number;
  tags: string[];
}

const mockPhotos: Photo[] = [
  {
    id: '1',
    url: '/placeholder.svg',
    title: 'Balayage Transformation',
    description: 'Beautiful balayage highlights on brunette hair',
    category: 'Hair Color',
    isBeforeAfter: true,
    beforeUrl: '/placeholder.svg',
    afterUrl: '/placeholder.svg',
    likes: 23,
    tags: ['balayage', 'highlights', 'transformation']
  },
  {
    id: '2',
    url: '/placeholder.svg',
    title: 'Modern Bob Cut',
    description: 'Sleek and stylish bob haircut',
    category: 'Hair Cut',
    isBeforeAfter: false,
    likes: 18,
    tags: ['bob', 'modern', 'sleek']
  },
  {
    id: '3',
    url: '/placeholder.svg',
    title: 'Nail Art Design',
    description: 'Intricate nail art with floral patterns',
    category: 'Nail Art',
    isBeforeAfter: false,
    likes: 31,
    tags: ['nails', 'art', 'floral']
  }
];

export const PhotoGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>(mockPhotos);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isUploading, setIsUploading] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    description: '',
    category: '',
    tags: ''
  });

  const categories = ['All', 'Hair Cut', 'Hair Color', 'Nail Art', 'Facial', 'Before/After'];
  
  const filteredPhotos = selectedCategory === 'All' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  const handleUpload = () => {
    console.log('Uploading photo:', newPhoto);
    // Simulate upload
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setNewPhoto({ title: '', description: '', category: '', tags: '' });
    }, 2000);
  };

  const handleDeletePhoto = (photoId: string) => {
    setPhotos(photos.filter(photo => photo.id !== photoId));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Photo Gallery</CardTitle>
            <CardDescription>Showcase your best work to attract customers</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Photos
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload New Photo</DialogTitle>
                <DialogDescription>Add a new photo to your gallery</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newPhoto.title}
                    onChange={(e) => setNewPhoto({...newPhoto, title: e.target.value})}
                    placeholder="Photo title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newPhoto.category}
                    onChange={(e) => setNewPhoto({...newPhoto, category: e.target.value})}
                    placeholder="e.g., Hair Cut, Hair Color"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newPhoto.description}
                    onChange={(e) => setNewPhoto({...newPhoto, description: e.target.value})}
                    placeholder="Describe the service or technique"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input
                    id="tags"
                    value={newPhoto.tags}
                    onChange={(e) => setNewPhoto({...newPhoto, tags: e.target.value})}
                    placeholder="e.g., balayage, highlights, transformation"
                  />
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Camera className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                </div>
                <Button onClick={handleUpload} disabled={isUploading} className="w-full">
                  {isUploading ? 'Uploading...' : 'Upload Photo'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPhotos.map((photo) => (
            <div key={photo.id} className="group relative overflow-hidden rounded-lg border">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary">
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeletePhoto(photo.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-medium">{photo.title}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2">{photo.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <Badge variant="secondary">{photo.category}</Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="h-3 w-3" />
                    {photo.likes}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {photo.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {photo.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{photo.tags.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
