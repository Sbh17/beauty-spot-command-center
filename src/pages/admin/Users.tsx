
import { Users as UsersIcon, Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable, StatusBadge } from "@/components/shared/DataTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for users
const users = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'customer', status: 'active', createdAt: '2024-01-15', lastLogin: '2024-01-20' },
  { id: '2', name: 'Bob Smith', email: 'bob@salon.com', role: 'owner', status: 'active', createdAt: '2024-01-14', lastLogin: '2024-01-19' },
  { id: '3', name: 'Carol Davis', email: 'carol@example.com', role: 'customer', status: 'pending', createdAt: '2024-01-13', lastLogin: '2024-01-18' },
  { id: '4', name: 'David Wilson', email: 'david@beautyspot.com', role: 'admin', status: 'active', createdAt: '2024-01-12', lastLogin: '2024-01-20' },
  { id: '5', name: 'Eva Brown', email: 'eva@salon2.com', role: 'owner', status: 'inactive', createdAt: '2024-01-11', lastLogin: '2024-01-15' },
];

const userColumns = [
  { key: 'name' as const, label: 'Name' },
  { key: 'email' as const, label: 'Email' },
  { key: 'role' as const, label: 'Role', render: (value: string) => <Badge variant="outline" className="capitalize">{value}</Badge> },
  { key: 'status' as const, label: 'Status', render: (value: string) => <StatusBadge status={value} /> },
  { key: 'createdAt' as const, label: 'Created', render: (value: string) => new Date(value).toLocaleDateString() },
  { key: 'lastLogin' as const, label: 'Last Login', render: (value: string) => new Date(value).toLocaleDateString() },
];

const Users = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage all users across the platform</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">987</div>
            <p className="text-xs text-muted-foreground">80% of total users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Complete list of platform users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search users..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          <DataTable
            data={users}
            columns={userColumns}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
