/*
  # Create Featured Hackathons and Themes Tables

  1. New Tables
    - `featured_hackathons`
      - `id` (uuid, primary key)
      - `title` (text) - Hackathon title
      - `logo_url` (text) - URL to hackathon logo/image
      - `days_left` (int) - Days until hackathon ends
      - `is_online` (boolean) - Whether hackathon is online
      - `prize_amount` (numeric) - Total prize amount
      - `participant_count` (int) - Number of participants
      - `is_featured` (boolean) - Whether to show in featured list
      - `display_order` (int) - Order to display hackathons
      - `created_at` (timestamptz) - Creation timestamp
      
    - `hackathon_themes`
      - `id` (uuid, primary key)
      - `theme_name` (text) - Theme name (e.g., "Beginner Friendly")
      - `hackathon_count` (int) - Number of hackathons with this theme
      - `total_prizes` (numeric) - Sum of prizes for this theme
      - `display_order` (int) - Order to display themes
      - `created_at` (timestamptz) - Creation timestamp
      
  2. Security
    - Enable RLS on both tables
    - Add policies for public read access (these are public hackathon listings)
*/

CREATE TABLE IF NOT EXISTS featured_hackathons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  logo_url text NOT NULL,
  days_left int NOT NULL,
  is_online boolean DEFAULT true,
  prize_amount numeric NOT NULL DEFAULT 0,
  participant_count int NOT NULL DEFAULT 0,
  is_featured boolean DEFAULT true,
  display_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS hackathon_themes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  theme_name text NOT NULL UNIQUE,
  hackathon_count int NOT NULL DEFAULT 0,
  total_prizes numeric NOT NULL DEFAULT 0,
  display_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE featured_hackathons ENABLE ROW LEVEL SECURITY;
ALTER TABLE hackathon_themes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Featured hackathons are viewable by everyone"
  ON featured_hackathons FOR SELECT
  USING (is_featured = true);

CREATE POLICY "Hackathon themes are viewable by everyone"
  ON hackathon_themes FOR SELECT
  USING (true);

CREATE INDEX IF NOT EXISTS idx_featured_hackathons_display_order ON featured_hackathons(display_order);
CREATE INDEX IF NOT EXISTS idx_hackathon_themes_display_order ON hackathon_themes(display_order);
