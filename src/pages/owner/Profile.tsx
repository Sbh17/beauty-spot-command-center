
import { User, Building2, Mail, Phone, Calendar, Edit, Save, X, Plus, Trash2, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingSalon, setIsEditingSalon] = useState(false);
  const [isEditingServices, setIsEditingServices] = useState(false);
  const [isEditingHours, setIsEditingHours] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate salon owner with over 10 years of experience in the beauty industry.',
    address: '123 Fashion Ave, Manhattan, NY 10001',
    website: 'www.glamourstudio.com',
    instagram: '@glamourstudio'
  });

  const [salonData, setSalonData] = useState({
    name: 'Glamour Studio',
    description: 'Premium hair and beauty salon offering cutting-edge styles and treatments.',
    address: '123 Fashion Ave, Manhattan, NY 10001',
    phone: '+1 (555) 123-4567',
    email: 'info@glamourstudio.com',
    website: 'www.glamourstudio.com',
    instagram: '@glamourstudio'
  });

  const [services, setServices] = useState([
    { id: 1, name: 'Hair Cut', price: 85, duration: 60, description: 'Professional haircut and styling' },
    { id: 2, name: 'Hair Color', price: 150, duration: 120, description: 'Full hair coloring service' },
    { id: 3, name: 'Highlights', price: 120, duration: 90, description: 'Professional highlights' },
    { id: 4, name: 'Manicure', price: 45, duration: 45, description: 'Classic manicure treatment' },
    { id: 5, name: 'Pedicure', price: 55, duration: 60, description: 'Relaxing pedicure service' },
    { id: 6, name: 'Facial', price: 95, duration: 75, description: 'Deep cleansing facial treatment' }
  ]);

  const [workingHours, setWorkingHours] = useState({
    monday: { open: '09:00', close: '20:00', closed: false },
    tuesday: { open: '09:00', close: '20:00', closed: false },
    wednesday: { open: '09:00', close: '20:00', closed: false },
    thursday: { open: '09:00', close: '21:00', closed: false },
    friday: { open: '09:00', close: '21:00', closed: false },
    saturday: { open: '08:00', close: '19:00', closed: false },
    sunday: { open: '10:00', close: '18:00', closed: false }
  });

  const [newService, setNewService] = useState({ name: '', price: '', duration: '', description: '' });

  const handleSave = () => {
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleSaveSalon = () => {
    console.log('Saving salon data:', salonData);
    setIsEditingSalon(false);
  };

  const handleSaveServices = () => {
    console.log('Saving services:', services);
    setIsEditingServices(false);
  };

  const handleSaveHours = () => {
    console.log('Saving working hours:', workingHours);
    setIsEditingHours(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '+1 (555) 123-4567',
      bio: 'Passionate salon owner with over 10 years of experience in the beauty industry.',
      address: '123 Fashion Ave, Manhattan, NY 10001',
      website: 'www.glamourstudio.com',
      instagram: '@glamourstudio'
    });
    setIsEditing(false);
  };

  const addService = () => {
    if (newService.name && newService.price && newService.duration) {
      const service = {
        id: services.length + 1,
        name: newService.name,
        price: parseInt(newService.price),
        duration: parseInt(newService.duration),
        description: newService.description
      };
      setServices([...services, service]);
      setNewService({ name: '', price: '', duration: '', description: '' });
    }
  };

  const removeService = (id: number) => {
    setServices(services.filter(service => service.id !== id));
  };

  const updateService = (id: number, field: string, value: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, [field]: field === 'price' || field === 'duration' ? parseInt(value) || 0 : value } : service
    ));
  };

  const updateWorkingHours = (day: string, field: string, value: string | boolean) => {
    setWorkingHours({
      ...workingHours,
      [day]: { ...workingHours[day as keyof typeof workingHours], [field]: value }
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile & Business</h1>
          <p className="text-muted-foreground">
            Manage your personal information, salon details, and business settings
          </p>
        </div>
      </div>

      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-white" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl">{user?.name}</CardTitle>
                <CardDescription className="text-lg">{user?.email}</CardDescription>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="capitalize">{user?.role}</Badge>
                  <Badge variant="secondary">
                    {user?.salonIds?.length || 0} Salon{user?.salonIds?.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </div>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your basic profile information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              ) : (
                <p className="py-2">{formData.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              ) : (
                <p className="py-2">{formData.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              ) : (
                <p className="py-2">{formData.phone}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              {isEditing ? (
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              ) : (
                <p className="py-2">{formData.address}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            {isEditing ? (
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                rows={3}
              />
            ) : (
              <p className="py-2">{formData.bio}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Salon Details */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Salon Information</CardTitle>
              <CardDescription>Manage your salon details and contact information</CardDescription>
            </div>
            {!isEditingSalon ? (
              <Button onClick={() => setIsEditingSalon(true)} variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Salon
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSaveSalon}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={() => setIsEditingSalon(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="salonName">Salon Name</Label>
              {isEditingSalon ? (
                <Input
                  id="salonName"
                  value={salonData.name}
                  onChange={(e) => setSalonData({...salonData, name: e.target.value})}
                />
              ) : (
                <p className="py-2">{salonData.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="salonPhone">Phone</Label>
              {isEditingSalon ? (
                <Input
                  id="salonPhone"
                  value={salonData.phone}
                  onChange={(e) => setSalonData({...salonData, phone: e.target.value})}
                />
              ) : (
                <p className="py-2">{salonData.phone}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="salonEmail">Email</Label>
              {isEditingSalon ? (
                <Input
                  id="salonEmail"
                  value={salonData.email}
                  onChange={(e) => setSalonData({...salonData, email: e.target.value})}
                />
              ) : (
                <p className="py-2">{salonData.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="salonWebsite">Website</Label>
              {isEditingSalon ? (
                <Input
                  id="salonWebsite"
                  value={salonData.website}
                  onChange={(e) => setSalonData({...salonData, website: e.target.value})}
                />
              ) : (
                <p className="py-2">{salonData.website}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="salonAddress">Address</Label>
            {isEditingSalon ? (
              <Input
                id="salonAddress"
                value={salonData.address}
                onChange={(e) => setSalonData({...salonData, address: e.target.value})}
              />
            ) : (
              <p className="py-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {salonData.address}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="salonDescription">Description</Label>
            {isEditingSalon ? (
              <Textarea
                id="salonDescription"
                value={salonData.description}
                onChange={(e) => setSalonData({...salonData, description: e.target.value})}
                rows={3}
              />
            ) : (
              <p className="py-2">{salonData.description}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Services Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Services & Pricing</CardTitle>
              <CardDescription>Manage your salon services, pricing, and duration</CardDescription>
            </div>
            {!isEditingServices ? (
              <Button onClick={() => setIsEditingServices(true)} variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Services
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSaveServices}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={() => setIsEditingServices(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isEditingServices && (
            <div className="mb-6 p-4 border rounded-lg bg-muted/50">
              <h4 className="font-medium mb-3">Add New Service</h4>
              <div className="grid gap-3 md:grid-cols-4">
                <Input
                  placeholder="Service name"
                  value={newService.name}
                  onChange={(e) => setNewService({...newService, name: e.target.value})}
                />
                <Input
                  type="number"
                  placeholder="Price ($)"
                  value={newService.price}
                  onChange={(e) => setNewService({...newService, price: e.target.value})}
                />
                <Input
                  type="number"
                  placeholder="Duration (min)"
                  value={newService.duration}
                  onChange={(e) => setNewService({...newService, duration: e.target.value})}
                />
                <Button onClick={addService} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              <Textarea
                placeholder="Service description"
                value={newService.description}
                onChange={(e) => setNewService({...newService, description: e.target.value})}
                className="mt-3"
                rows={2}
              />
            </div>
          )}
          
          <div className="space-y-3">
            {services.map((service) => (
              <div key={service.id} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="flex-1 grid gap-2 md:grid-cols-4">
                  {isEditingServices ? (
                    <>
                      <Input
                        value={service.name}
                        onChange={(e) => updateService(service.id, 'name', e.target.value)}
                      />
                      <Input
                        type="number"
                        value={service.price}
                        onChange={(e) => updateService(service.id, 'price', e.target.value)}
                      />
                      <Input
                        type="number"
                        value={service.duration}
                        onChange={(e) => updateService(service.id, 'duration', e.target.value)}
                      />
                      <Input
                        value={service.description}
                        onChange={(e) => updateService(service.id, 'description', e.target.value)}
                        placeholder="Description"
                      />
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-muted-foreground">{service.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${service.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{service.duration} min</p>
                      </div>
                      <div></div>
                    </>
                  )}
                </div>
                {isEditingServices && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeService(service.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Working Hours */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Working Hours</CardTitle>
              <CardDescription>Set your salon operating hours</CardDescription>
            </div>
            {!isEditingHours ? (
              <Button onClick={() => setIsEditingHours(true)} variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Hours
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSaveHours}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={() => setIsEditingHours(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(workingHours).map(([day, hours]) => (
            <div key={day} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium capitalize w-20">{day}</span>
              </div>
              {isEditingHours ? (
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={hours.closed}
                      onChange={(e) => updateWorkingHours(day, 'closed', e.target.checked)}
                    />
                    <span className="text-sm">Closed</span>
                  </label>
                  {!hours.closed && (
                    <>
                      <Input
                        type="time"
                        value={hours.open}
                        onChange={(e) => updateWorkingHours(day, 'open', e.target.value)}
                        className="w-32"
                      />
                      <span>to</span>
                      <Input
                        type="time"
                        value={hours.close}
                        onChange={(e) => updateWorkingHours(day, 'close', e.target.value)}
                        className="w-32"
                      />
                    </>
                  )}
                </div>
              ) : (
                <span className="text-muted-foreground">
                  {hours.closed ? 'Closed' : `${hours.open} - ${hours.close}`}
                </span>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Salon Access */}
      <Card>
        <CardHeader>
          <CardTitle>Salon Access</CardTitle>
          <CardDescription>Salons you have access to manage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {user?.salonIds?.map((salonId, index) => (
              <div key={salonId} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">
                      {salonId === 'salon-1' ? 'Glamour Studio' : 
                       salonId === 'salon-2' ? 'Beauty Haven' : 
                       salonId === 'salon-3' ? 'Radiant Salon' : salonId}
                    </p>
                    <p className="text-sm text-muted-foreground">Owner Access</p>
                  </div>
                </div>
                <Badge variant={salonId === user.currentSalonId ? 'default' : 'secondary'}>
                  {salonId === user.currentSalonId ? 'Current' : 'Available'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
