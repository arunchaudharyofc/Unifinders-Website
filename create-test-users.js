#!/usr/bin/env node
/**
 * CREATE TEST USERS — run this once to set up test accounts
 * Usage: node create-test-users.js
 * 
 * Requires SUPABASE_SERVICE_ROLE_KEY in your .env or .env.local
 * Get it from: Supabase Dashboard > Settings > API > service_role key
 */

const fs = require('fs');
const path = require('path');

// Load env
const envFiles = ['.env.local', '.env'];
const env = {};
for (const file of envFiles) {
  try {
    fs.readFileSync(path.join(process.cwd(), file), 'utf8').split('\n').forEach(line => {
      const [k, ...v] = line.split('=');
      if (k && v.length) env[k.trim()] = v.join('=').trim();
    });
  } catch {}
}

const SUPABASE_URL = env['NEXT_PUBLIC_SUPABASE_URL'];
const SERVICE_KEY = env['SUPABASE_SERVICE_ROLE_KEY'];

if (!SERVICE_KEY) {
  console.error(`
❌ SUPABASE_SERVICE_ROLE_KEY not found!

To fix this:
1. Go to: https://supabase.com/dashboard/project/umekgwwrsucnxxfvfqkw/settings/api
2. Copy the "service_role" key (starts with eyJ...)
3. Add to your .env.local file:
   SUPABASE_SERVICE_ROLE_KEY=eyJ...your-key...

Then run this script again.
`);
  process.exit(1);
}

async function createUser(email, password, fullName, role) {
  const headers = {
    'apikey': SERVICE_KEY,
    'Authorization': `Bearer ${SERVICE_KEY}`,
    'Content-Type': 'application/json'
  };

  // 1. Create auth user
  console.log(`Creating ${role} user: ${email}...`);
  const authRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email,
      password,
      email_confirm: true,  // Skip email confirmation
      user_metadata: { full_name: fullName }
    })
  });
  const authData = await authRes.json();
  
  if (!authRes.ok) {
    if (authData.message?.includes('already been registered')) {
      console.log(`  ⚠️  ${email} already exists — skipping creation`);
      // Try to get existing user ID
      const listRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?email=${encodeURIComponent(email)}`, { headers });
      const listData = await listRes.json();
      const userId = listData.users?.[0]?.id;
      if (userId) return { id: userId };
      return null;
    }
    console.error(`  ❌ Failed to create ${email}:`, authData.message || JSON.stringify(authData));
    return null;
  }

  const userId = authData.id;
  console.log(`  ✅ Auth user created: ${userId}`);

  // 2. Create profile row
  const profileRes = await fetch(`${SUPABASE_URL}/rest/v1/profiles`, {
    method: 'POST',
    headers: { ...headers, 'Prefer': 'on-conflict=do-nothing' },
    body: JSON.stringify({
      user_id: userId,
      full_name: fullName,
      role: role,
    })
  });

  if (profileRes.ok || profileRes.status === 409) {
    console.log(`  ✅ Profile created with role: ${role}`);
  } else {
    const profileErr = await profileRes.text();
    console.warn(`  ⚠️  Profile creation issue: ${profileErr}`);
  }

  return { id: userId };
}

async function main() {
  console.log('🚀 Creating Unifinders test accounts...\n');

  const student = await createUser(
    'student@unifinders.test',
    'Student@1234',
    'Test Student',
    'student'
  );

  const admin = await createUser(
    'admin@unifinders.test',
    'Admin@1234',
    'Test Admin',
    'admin'
  );

  console.log('\n' + '='.repeat(50));
  console.log('✅ TEST CREDENTIALS READY');
  console.log('='.repeat(50));
  console.log('\n👤 STUDENT ACCOUNT:');
  console.log('   Email:    student@unifinders.test');
  console.log('   Password: Student@1234');
  console.log('   Role:     student');
  console.log('\n👑 ADMIN ACCOUNT:');
  console.log('   Email:    admin@unifinders.test');
  console.log('   Password: Admin@1234');
  console.log('   Role:     admin (sees Admin sidebar)');
  console.log('\n📝 NOTE: Admin sidebar only appears in /dashboard');
  console.log('='.repeat(50));
}

main().catch(console.error);
