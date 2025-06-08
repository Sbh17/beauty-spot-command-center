import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/ui/image-upload";
import { Plus, X, Building2, MapPin, Mail, Phone, Clock, Images } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface AddSalonDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSalonAdded: (salon: any) => void;
}

export const AddSalonDialog: React.FC<AddSalonDialogProps> = ({
  isOpen,
  onClose,
  onSalonAdded
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    salonName: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    services: [] as string[],
    images: [] as File[],
    workingHours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '9:00 AM - 5:00 PM',
      sunday: 'Closed'
    }
  });
  const [newService, setNewService] = useState('');

  const commonServices = [
    'Hair Cut', 'Hair Color', 'Highlights', 'Manicure', 'Pedicure', 
    'Facial', 'Massage', 'Eyebrow Threading', 'Hair Styling', 'Blowout'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleWorkingHoursChange = (day: string, hours: string) => {
    setFormData(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: hours
      }
    }));
  };

  const addService = (service: string) => {
    if (service && !formData.services.includes(service)) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, service]
      }));
    }
    setNewService('');
  };

  const removeService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(s => s !== service)
    }));
  };

  const handleImagesChange = (images: File[]) => {
    setFormData(prev => ({
      ...prev,
      images
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.salonName || !formData.address || !formData.phone || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, you would upload the images to a server/cloud storage
    // For now, we'll just create URLs from the files for demo purposes
    const imageUrls = formData.images.map(file => URL.createObjectURL(file));

    const newSalon = {
      id: `salon-${Date.now()}`,
      name: formData.salonName,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      description: formData.description,
      rating: 5.0,
      totalReviews: 0,
      totalStaff: 1,
      monthlyAppointments: 0,
      monthlyRevenue: 0,
      services: formData.services,
      workingHours: formData.workingHours,
      images: imageUrls
    };

    onSalonAdded(newSalon);
    
    toast({
      title: "Salon Added Successfully",
      description: `${formData.salonName} has been added to your salons with ${formData.images.length} images.`
    });
    
    onClose();
    
    // Reset form
    setFormData({
      salonName: '',
      address: '',
      phone: '',
      email: '',
      description: '',
      services: [],
      images: [],
      workingHours: {
        monday: '9:00 AM - 6:00 PM',
        tuesday: '9:00 AM - 6:00 PM',
        wednesday: '9:00 AM - 6:00 PM',
        thursday: '9:00 AM - 6:00 PM',
        friday: '9:00 AM - 6:00 PM',
        saturday: '9:00 AM - 5:00 PM',
        sunday: 'Closed'
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Add New Salon
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="salonName">Salon Name *</Label>
                  <Input
                    id="salonName"
                    value={formData.salonName}
                    onChange={(e) => handleInputChange('salonName', e.target.value)}
                    placeholder="Enter salon name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="salon@example.com"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="123 Main St, City, State 12345"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your salon..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Salon Images */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Images className="h-5 w-5" />
                Salon Images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                value={formData.images}
                onChange={handleImagesChange}
                maxFiles={10}
              />
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Services Offered</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newService}
                  onChange={(e) => setNewService(e.target.value)}
                  placeholder="Add a service..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addService(newService);
                    }
                  }}
                />
                <Button 
                  type="button" 
                  onClick={() => addService(newService)}
                  variant="outline"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">Quick add common services:</p>
                <div className="flex flex-wrap gap-2">
                  {commonServices.map((service) => (
                    <Button
                      key={service}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addService(service)}
                      disabled={formData.services.includes(service)}
                    >
                      {service}
                    </Button>
                  ))}
                </div>
              </div>
              
              {formData.services.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Selected Services:</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.services.map((service) => (
                      <Badge key={service} variant="secondary" className="flex items-center gap-1">
                        {service}
                        <button
                          type="button"
                          onClick={() => removeService(service)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Working Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Working Hours</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(formData.workingHours).map(([day, hours]) => (
                <div key={day} className="flex items-center gap-4">
                  <Label className="w-20 capitalize">{day}</Label>
                  <Input
                    value={hours}
                    onChange={(e) => handleWorkingHoursChange(day, e.target.value)}
                    placeholder="9:00 AM - 6:00 PM or Closed"
                    className="flex-1"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              <Building2 className="h-4 w-4 mr-2" />
              Add Salon
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
