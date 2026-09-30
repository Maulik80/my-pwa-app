import { Plus, Shield, Crown } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';

const admins = [
  { id: '1', name: 'Super Admin', email: 'admin@skpt.com', role: 'super_admin' },
  { id: '2', name: 'Match Admin', email: 'scorer@skpt.com', role: 'admin' },
  { id: '3', name: 'John Doe', email: 'john@skpt.com', role: 'admin' },
  { id: '4', name: 'Jane Smith', email: 'jane@skpt.com', role: 'admin' },
];

export default function AdminRolesPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Roles</h1>
          <p className="text-sm text-gray-500 mt-1">Manage admin users and their roles</p>
        </div>
        <Button icon={<Plus className="w-4 h-4" />}>Add Admin</Button>
      </div>

      <div className="space-y-3">
        {admins.map((admin) => (
          <Card key={admin.id} className="p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <Avatar name={admin.name} size="md" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 truncate">{admin.name}</p>
                    {admin.role === 'super_admin' ? (
                      <Crown className="w-4 h-4 text-amber-500 shrink-0" />
                    ) : (
                      <Shield className="w-4 h-4 text-primary-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 truncate">{admin.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant={admin.role === 'super_admin' ? 'warning' : 'info'}>
                  {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                </Badge>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
