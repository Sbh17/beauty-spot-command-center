
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, User, Mail, FileText, Calendar, Check, X } from "lucide-react";

interface SalonRequest {
  id: string;
  salonName: string;
  ownerName: string;
  email: string;
  location: string;
  status: string;
  submittedAt: string;
  documents: string;
}

interface SalonRequestDetailsProps {
  request: SalonRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
}

export const SalonRequestDetails: React.FC<SalonRequestDetailsProps> = ({
  request,
  isOpen,
  onClose,
  onApprove,
  onReject
}) => {
  if (!request) return null;

  const handleApprove = () => {
    onApprove(request.id);
    onClose();
  };

  const handleReject = () => {
    onReject(request.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Salon Registration Request
          </DialogTitle>
          <DialogDescription>
            Review the details for {request.salonName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Salon Name</label>
                  <p className="text-lg font-semibold">{request.salonName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <div className="mt-1">
                    <Badge variant={request.status === 'pending' ? 'secondary' : 'default'}>
                      {request.status}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{request.location}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Submitted on {new Date(request.submittedAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Owner Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Owner Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{request.ownerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{request.email}</span>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>Documentation Status: </span>
                <Badge variant={request.documents === 'Complete' ? 'default' : 'secondary'}>
                  {request.documents}
                </Badge>
              </div>
              {request.documents === 'Complete' && (
                <div className="mt-3 space-y-2">
                  <p className="text-sm text-muted-foreground">Submitted documents:</p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Business License</li>
                    <li>• Insurance Certificate</li>
                    <li>• Owner Identification</li>
                    <li>• Salon Photos</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          {request.status === 'pending' && (
            <div className="flex gap-3 pt-4">
              <Button onClick={handleApprove} className="flex-1">
                <Check className="h-4 w-4 mr-2" />
                Approve Request
              </Button>
              <Button onClick={handleReject} variant="destructive" className="flex-1">
                <X className="h-4 w-4 mr-2" />
                Reject Request
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
