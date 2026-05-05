-- =====================================================
-- Unifinders: Module 1 Schema Migration
-- Run this in: Supabase Dashboard → SQL Editor
-- =====================================================

-- 1. Add new columns to existing 'universities' table
ALTER TABLE "universities"
  ADD COLUMN IF NOT EXISTS "established" INTEGER,
  ADD COLUMN IF NOT EXISTS "acceptance_rate" DOUBLE PRECISION,
  ADD COLUMN IF NOT EXISTS "cover_image_url" TEXT,
  ADD COLUMN IF NOT EXISTS "student_count" INTEGER;

-- 2. Create 'bookmarks' table
CREATE TABLE IF NOT EXISTS "bookmarks" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "user_id" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "bookmarks_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "bookmarks_user_id_entity_type_entity_id_key"
  ON "bookmarks"("user_id", "entity_type", "entity_id");
CREATE INDEX IF NOT EXISTS "bookmarks_user_id_entity_type_idx"
  ON "bookmarks"("user_id", "entity_type");

-- 3. Create 'study_fields' table
CREATE TABLE IF NOT EXISTS "study_fields" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "icon_url" TEXT,
    "description" TEXT,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "study_fields_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "study_fields_name_key" ON "study_fields"("name");
CREATE UNIQUE INDEX IF NOT EXISTS "study_fields_slug_key" ON "study_fields"("slug");

-- 4. Create 'chat_messages' table
CREATE TABLE IF NOT EXISTS "chat_messages" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "sender_id" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "message_type" TEXT NOT NULL DEFAULT 'text',
    "file_url" TEXT,
    "file_name" TEXT,
    "file_size_bytes" INTEGER,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "read_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "chat_messages_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "chat_messages_sender_id_receiver_id_idx"
  ON "chat_messages"("sender_id", "receiver_id");
CREATE INDEX IF NOT EXISTS "chat_messages_receiver_id_is_read_idx"
  ON "chat_messages"("receiver_id", "is_read");

-- 5. Create 'help_articles' table
CREATE TABLE IF NOT EXISTS "help_articles" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "tags" TEXT[] DEFAULT '{}',
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "help_articles_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "help_articles_slug_key" ON "help_articles"("slug");
CREATE INDEX IF NOT EXISTS "help_articles_category_is_published_idx"
  ON "help_articles"("category", "is_published");

-- 6. Create 'country_guides' table
CREATE TABLE IF NOT EXISTS "country_guides" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "country" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "flag_emoji" TEXT NOT NULL,
    "flag_url" TEXT,
    "banner_image_url" TEXT,
    "overview" TEXT NOT NULL,
    "why_study_here" JSONB,
    "living_cost" JSONB,
    "visa_requirements" JSONB,
    "top_cities" JSONB,
    "work_rights" JSONB,
    "intakes" TEXT[] DEFAULT '{}',
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "avg_tuition_min" DOUBLE PRECISION,
    "avg_tuition_max" DOUBLE PRECISION,
    "university_count" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "country_guides_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX IF NOT EXISTS "country_guides_country_key" ON "country_guides"("country");
CREATE UNIQUE INDEX IF NOT EXISTS "country_guides_slug_key" ON "country_guides"("slug");

-- ✅ Done! All 5 new tables created + 4 new columns on universities.
