--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2 (Debian 13.2-1.pgdg100+1)
-- Dumped by pg_dump version 13.2 (Debian 13.2-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: app_dev
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    title text,
    "startTime" text
);


ALTER TABLE public.sessions OWNER TO app_dev;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: app_dev
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO app_dev;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: app_dev
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: talks; Type: TABLE; Schema: public; Owner: app_dev
--

CREATE TABLE public.talks (
    id integer NOT NULL,
    title text,
    duration integer,
    "sessionId" integer
);


ALTER TABLE public.talks OWNER TO app_dev;

--
-- Name: talks_id_seq; Type: SEQUENCE; Schema: public; Owner: app_dev
--

CREATE SEQUENCE public.talks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.talks_id_seq OWNER TO app_dev;

--
-- Name: talks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: app_dev
--

ALTER SEQUENCE public.talks_id_seq OWNED BY public.talks.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: app_dev
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: talks id; Type: DEFAULT; Schema: public; Owner: app_dev
--

ALTER TABLE ONLY public.talks ALTER COLUMN id SET DEFAULT nextval('public.talks_id_seq'::regclass);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: app_dev
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: talks talks_pkey; Type: CONSTRAINT; Schema: public; Owner: app_dev
--

ALTER TABLE ONLY public.talks
    ADD CONSTRAINT talks_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

