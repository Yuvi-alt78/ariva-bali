/*
  # Ariva Tourism Analytics Schema

  1. New Tables
    - `page_views`
      - `id` (uuid, primary key)
      - `session_id` (text) - anonymous session identifier
      - `page` (text) - which page/section viewed
      - `referrer` (text) - traffic source
      - `user_agent` (text) - browser/device info
      - `country` (text) - visitor country
      - `created_at` (timestamptz)

    - `newsletter_subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `subscribed_at` (timestamptz)

    - `booking_inquiries`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `destination` (text)
      - `travel_date` (date)
      - `guests` (integer)
      - `message` (text)
      - `status` (text) default 'pending'
      - `created_at` (timestamptz)

    - `section_interactions`
      - `id` (uuid, primary key)
      - `session_id` (text)
      - `section_name` (text)
      - `interaction_type` (text) - 'view', 'click', 'scroll'
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public insert allowed for analytics, inquiries, newsletter
    - No public read (admin only)
*/

CREATE TABLE IF NOT EXISTS page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL DEFAULT '',
  page text NOT NULL DEFAULT '/',
  referrer text DEFAULT '',
  user_agent text DEFAULT '',
  country text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert page views"
  ON page_views FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text DEFAULT '',
  subscribed_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (email IS NOT NULL AND email != '');

CREATE TABLE IF NOT EXISTS booking_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text DEFAULT '',
  destination text DEFAULT '',
  travel_date date,
  guests integer DEFAULT 2,
  message text DEFAULT '',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE booking_inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit booking inquiry"
  ON booking_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (email IS NOT NULL AND email != '' AND name IS NOT NULL AND name != '');

CREATE TABLE IF NOT EXISTS section_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL DEFAULT '',
  section_name text NOT NULL DEFAULT '',
  interaction_type text NOT NULL DEFAULT 'view',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE section_interactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log section interactions"
  ON section_interactions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_page_views_created_at ON page_views(created_at);
CREATE INDEX IF NOT EXISTS idx_page_views_session ON page_views(session_id);
CREATE INDEX IF NOT EXISTS idx_section_interactions_section ON section_interactions(section_name);
CREATE INDEX IF NOT EXISTS idx_booking_inquiries_status ON booking_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_booking_inquiries_created ON booking_inquiries(created_at);
