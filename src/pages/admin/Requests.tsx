
import { ClipboardList, Check, X, Clock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable, StatusBadge } from "@/components/shared/DataTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for salon approval requests
const requests = [
  { 
    id: '1', 
    salonName: 'Luxe Beauty Lounge', 
    ownerName: 'Sarah Johnson', 
    email: 'sarah@luxebeauty.com',
    location: 'Manhattan, NY',
    status: 'pending', 
    submittedAt: '2024-01-18',
    documents: 'Complete'
  },
  { 
    id: '2', 
    salonName: 'Serenity Spa', 
    ownerName: 'Michael Chen', 
    email: 'michael@serenityspa.com',
    location: 'Beverly Hills, CA',
    status: 'under_review', 
    submittedAt: '2024-01-17',
    documents: 'Incomplete'
  },
  { 
    id: '3', 
    salonName: 'Urban Cuts', 
    ownerName: 'Jessica Martinez', 
    email: 'jessica@urbancuts.com',
    location: 'Austin, TX',
    status: 'pending', 
    submittedAt: '2024-01-16',
    documents: 'Complete'
  },
];

const requestColumns = [
  { key: 'salonName' as const, label: 'Salon Name' },
  { key: 'ownerName' as const, label: 'Owner' },
  { key: 'email' as const, label: 'Email' },
  { key: 'location' as const, label: 'Location' },
  { key: 'status' as const, label: 'Status', render: (value: string) => <StatusBadge status={value} /> },
  { key: 'documents' as const, label: 'Documents', render: (value: string) => (
    <Badge variant={value === 'Complete' ? 'default' : 'secondary'}>
      {value}
    </Badge>
  )},
  { key: 'submittedAt' as const, label: 'Submitted', render: (value: string) => new Date(value).toLocaleDateString() },
];

const Requests = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Salon Approval Requests</h1>
        <p className="text-muted-foreground">Review and manage salon registration requests</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Being processed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved This Week</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <X className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Requests</CardTitle>
          <CardDescription>Review salon registration applications</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={requests}
            columns={requestColumns}
            actions={
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button size="sm" variant="default">
                  <Check className="h-3 w-3 mr-1" />
                  Approve
                </Button>
                <Button size="sm" variant="destructive">
                  <X className="h-3 w-3 mr-1" />
                  Reject
                </Button>
              </div>
            }
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common approval workflow actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full justify-start">
            <Check className="h-4 w-4 mr-2" />
            Bulk Approve Completed Applications
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <ClipboardList className="h-4 w-4 mr-2" />
            Export Requests Report
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Eye className="h-4 w-4 mr-2" />
            View Application Guidelines
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Requests;
