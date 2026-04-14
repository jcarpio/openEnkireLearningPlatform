-- ══════════════════════════════════════════════════════════════════
-- ENKIRE LEARNING PLATFORM — Supabase Schema v1
-- Run this in the Supabase SQL Editor
-- ══════════════════════════════════════════════════════════════════

create extension if not exists "uuid-ossp";

-- ── Profiles ─────────────────────────────────────────────────────────
create table public.profiles (
  id             uuid references auth.users on delete cascade primary key,
  username       text unique not null,
  display_name   text not null,
  avatar_url     text,
  bio            text,
  location       text,
  pronouns       text,
  github_handle  text,
  linkedin_handle text,
  twitter_handle text,
  role           text not null default 'student'
                 check (role in ('student','mentor','admin')),
  total_xp       integer not null default 0,
  created_at     timestamptz default now()
);

-- ── Tracks ────────────────────────────────────────────────────────────
create table public.tracks (
  id               uuid primary key default uuid_generate_v4(),
  slug             text unique not null,
  title            text not null,
  description      text,
  long_description text,
  emoji            text default '📚',
  icon_url         text,
  color            text default '#6200ee',
  category         text,
  difficulty       text default 'beginner'
                   check (difficulty in ('beginner','intermediate','advanced')),
  total_exercises  integer default 0,
  estimated_hours  integer default 10,
  tags             text[] default '{}',
  author_id        uuid references public.profiles(id),
  is_published     boolean default false,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- ── Exercises ─────────────────────────────────────────────────────────
create table public.exercises (
  id               uuid primary key default uuid_generate_v4(),
  track_id         uuid references public.tracks(id) on delete cascade,
  title            text not null,
  description      text,
  instructions     text,
  "order"          integer not null default 1,
  xp_reward        integer default 50,
  difficulty       text default 'beginner',
  type             text not null check (type in ('quiz','media_submission','video_lesson')),
  -- quiz
  questions        jsonb,
  passing_score    integer default 75,
  -- media_submission
  submission_prompt text,
  accepted_types   text[] default '{video}',
  max_file_size_mb integer default 50,
  -- video_lesson
  video_provider   text check (video_provider in ('youtube','cloudflare','bunny')),
  video_id         text,
  video_duration_mins integer,
  requires_completion boolean default true,
  created_at       timestamptz default now()
);

-- ── Enrollments ───────────────────────────────────────────────────────
create table public.enrollments (
  user_id    uuid references public.profiles(id) on delete cascade,
  track_id   uuid references public.tracks(id) on delete cascade,
  enrolled_at timestamptz default now(),
  primary key (user_id, track_id)
);

-- ── User Progress ─────────────────────────────────────────────────────
create table public.user_progress (
  user_id                 uuid references public.profiles(id) on delete cascade,
  track_id                uuid references public.tracks(id) on delete cascade,
  completed_exercises     uuid[] default '{}',
  current_exercise_order  integer default 1,
  total_xp_earned         integer default 0,
  started_at              timestamptz default now(),
  completed_at            timestamptz,
  last_touched            timestamptz default now(),
  primary key (user_id, track_id)
);

-- ── Submissions ───────────────────────────────────────────────────────
create table public.submissions (
  id              uuid primary key default uuid_generate_v4(),
  exercise_id     uuid references public.exercises(id) on delete cascade,
  user_id         uuid references public.profiles(id) on delete cascade,
  type            text not null check (type in ('quiz','media_submission','video_lesson')),
  -- quiz
  answers         jsonb,
  score           integer,
  passed          boolean,
  -- media
  status          text default 'pending'
                  check (status in ('pending','in_review','approved','needs_work')),
  media_url       text,
  media_type      text,
  text_content    text,
  student_note    text,
  -- video
  watched_pct     integer default 0,
  -- common
  xp_earned       integer default 0,
  submitted_at    timestamptz default now(),
  reviewed_at     timestamptz,
  mentor_id       uuid references public.profiles(id)
);

-- ── Feedback ──────────────────────────────────────────────────────────
create table public.feedback (
  id              uuid primary key default uuid_generate_v4(),
  submission_id   uuid references public.submissions(id) on delete cascade,
  mentor_id       uuid references public.profiles(id),
  content         text not null,
  status          text check (status in ('approved','needs_work')),
  created_at      timestamptz default now()
);

-- ── Badges ────────────────────────────────────────────────────────────
create table public.badges (
  id                 uuid primary key default uuid_generate_v4(),
  slug               text unique not null,
  name               text not null,
  description        text,
  icon_name          text not null,
  rarity             text default 'common'
                     check (rarity in ('common','rare','epic','legendary','ultimate')),
  condition_text     text,
  xp_required        integer,
  exercises_required integer,
  tracks_required    integer,
  num_awardees       integer default 0
);

create table public.user_badges (
  user_id   uuid references public.profiles(id) on delete cascade,
  badge_id  uuid references public.badges(id) on delete cascade,
  earned_at timestamptz default now(),
  primary key (user_id, badge_id)
);

-- ── Testimonials ──────────────────────────────────────────────────────
create table public.testimonials (
  id            uuid primary key default uuid_generate_v4(),
  content       text not null,
  student_id    uuid references public.profiles(id),
  mentor_id     uuid references public.profiles(id),
  exercise_id   uuid references public.exercises(id),
  is_revealed   boolean default true,
  created_at    timestamptz default now()
);

-- ── Community posts ───────────────────────────────────────────────────
create table public.community_posts (
  id         uuid primary key default uuid_generate_v4(),
  author_id  uuid references public.profiles(id) on delete cascade,
  content    text not null,
  post_type  text default 'question' check (post_type in ('question','discussion','achievement')),
  track_id   uuid references public.tracks(id),
  exercise_id uuid references public.exercises(id),
  parent_id  uuid references public.community_posts(id),
  xp_reward  integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ══════════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ══════════════════════════════════════════════════════════════════
alter table public.profiles        enable row level security;
alter table public.tracks          enable row level security;
alter table public.exercises       enable row level security;
alter table public.enrollments     enable row level security;
alter table public.user_progress   enable row level security;
alter table public.submissions     enable row level security;
alter table public.feedback        enable row level security;
alter table public.badges          enable row level security;
alter table public.user_badges     enable row level security;
alter table public.testimonials    enable row level security;
alter table public.community_posts enable row level security;

-- Public read for published tracks/exercises/badges
create policy "tracks_public_read"    on public.tracks    for select using (is_published = true);
create policy "exercises_public_read" on public.exercises for select using (true);
create policy "badges_public_read"    on public.badges    for select using (true);
create policy "testimonials_read"     on public.testimonials for select using (is_revealed = true);

-- Own data
create policy "profiles_own"    on public.profiles    for all using (auth.uid() = id);
create policy "progress_own"    on public.user_progress for all using (auth.uid() = user_id);
create policy "submissions_own" on public.submissions for all using (auth.uid() = user_id);
create policy "enrollments_own" on public.enrollments for all using (auth.uid() = user_id);
create policy "badges_own"      on public.user_badges for all using (auth.uid() = user_id);

-- Mentors can read all submissions for their tracks
create policy "mentor_submissions" on public.submissions
  for select using (
    auth.uid() = mentor_id or
    exists (select 1 from public.profiles where id = auth.uid() and role in ('mentor','admin'))
  );

-- Tracks: authors can manage their own
create policy "tracks_manage" on public.tracks
  for all using (auth.uid() = author_id);

-- Community posts: anyone enrolled can read, own posts to write
create policy "community_read"  on public.community_posts for select using (true);
create policy "community_write" on public.community_posts for insert using (auth.uid() = author_id);

-- ══════════════════════════════════════════════════════════════════
-- STORAGE BUCKET (run in Supabase dashboard → Storage)
-- ══════════════════════════════════════════════════════════════════
-- Bucket name: "submissions"
-- Public: false (use signed URLs)
-- Max file size: 100MB
-- Allowed MIME types: video/*, audio/*, image/*

-- ══════════════════════════════════════════════════════════════════
-- TRIGGER: Award XP when submission approved
-- ══════════════════════════════════════════════════════════════════
create or replace function award_xp_on_approval()
returns trigger as $$
begin
  if NEW.status = 'approved' and OLD.status != 'approved' then
    update public.profiles
    set total_xp = total_xp + (
      select xp_reward from public.exercises where id = NEW.exercise_id
    )
    where id = NEW.user_id;

    update public.user_progress
    set completed_exercises = array_append(completed_exercises, NEW.exercise_id),
        total_xp_earned = total_xp_earned + (
          select xp_reward from public.exercises where id = NEW.exercise_id
        ),
        last_touched = now()
    where user_id = NEW.user_id
      and track_id = (select track_id from public.exercises where id = NEW.exercise_id);
  end if;
  return NEW;
end;
$$ language plpgsql security definer;

create trigger on_submission_approved
  after update on public.submissions
  for each row execute function award_xp_on_approval();
