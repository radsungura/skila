// core/constants/roles.constants.ts

import { UserRole } from './interfaces';

export const ROLES = {
  ADMIN: 'admin' as UserRole,
  PROVIDER: 'provider' as UserRole,
  CLIENT: 'client' as UserRole
} as const;

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  admin: 3,
  provider: 2,
  client: 1
};

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Administrateur',
  provider: 'Prestataire',
  client: 'Client'
};

export const ROLE_ICONS: Record<UserRole, string> = {
  admin: '👑',
  provider: '🎪',
  client: '👤'
};

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: ['*'], // Toutes les permissions
  provider: ['manage_services', 'view_bookings', 'manage_profile'],
  client: ['view_services', 'create_bookings', 'manage_profile']
};