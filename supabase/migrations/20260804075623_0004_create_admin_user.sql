/*
# Create admin auth user

Creates a Supabase auth user with email admin@revnexa.com and password 2808.
Also creates the corresponding admin_profiles entry.

Note: The password hash is generated using crypt() with pgcrypto extension.
*/

-- Ensure pgcrypto is available
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Insert the auth user directly
-- Supabase uses bcrypt for password hashing, but we can use the built-in
-- auth schema. The encrypted_password column needs a bcrypt hash.
-- We'll use the Supabase auth.admin.createUser approach via a DO block.

DO $$
DECLARE
  new_user_id uuid;
BEGIN
  -- Check if user already exists
  SELECT id INTO new_user_id FROM auth.users WHERE email = 'admin@revnexa.com';
  
  IF new_user_id IS NULL THEN
    -- Insert into auth.users
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      created_at,
      updated_at,
      raw_app_meta_data,
      raw_user_meta_data,
      confirmation_token,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'admin@revnexa.com',
      crypt('2808', gen_salt('bf')),
      now(),
      now(),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{}'::jsonb,
      '',
      ''
    )
    RETURNING id INTO new_user_id;
  END IF;
  
  -- Insert into admin_profiles
  INSERT INTO public.admin_profiles (id, email, role)
  VALUES (new_user_id, 'admin@revnexa.com', 'admin')
  ON CONFLICT (id) DO NOTHING;
END $$;
