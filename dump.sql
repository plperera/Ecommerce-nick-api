--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4 (Debian 15.4-1.pgdg120+1)
-- Dumped by pg_dump version 15.4 (Debian 15.4-1.pgdg120+1)

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

--
-- Name: OrderStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."OrderStatus" AS ENUM (
    'PENDING',
    'PROCESSING',
    'SHIPPED',
    'DELIVERED',
    'CANCELLED'
);


ALTER TYPE public."OrderStatus" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.address (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "mainAddress" boolean DEFAULT true NOT NULL,
    cep text NOT NULL,
    street text NOT NULL,
    city text NOT NULL,
    state text NOT NULL,
    number text NOT NULL,
    neighborhood text NOT NULL,
    "addressDetail" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "addressName" text NOT NULL
);


ALTER TABLE public.address OWNER TO postgres;

--
-- Name: address_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.address_id_seq OWNER TO postgres;

--
-- Name: address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.address_id_seq OWNED BY public.address.id;


--
-- Name: banner; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.banner (
    id integer NOT NULL,
    text text NOT NULL,
    "imageId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.banner OWNER TO postgres;

--
-- Name: banner_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.banner_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.banner_id_seq OWNER TO postgres;

--
-- Name: banner_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.banner_id_seq OWNED BY public.banner.id;


--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "showInMenu" boolean DEFAULT false NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: categorySubCategory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."categorySubCategory" (
    id integer NOT NULL,
    "categoryId" integer NOT NULL,
    "subCategoryId" integer NOT NULL
);


ALTER TABLE public."categorySubCategory" OWNER TO postgres;

--
-- Name: categorySubCategory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."categorySubCategory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."categorySubCategory_id_seq" OWNER TO postgres;

--
-- Name: categorySubCategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."categorySubCategory_id_seq" OWNED BY public."categorySubCategory".id;


--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_id_seq OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- Name: enrollment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.enrollment (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    cpf text NOT NULL,
    birthday text NOT NULL,
    phone text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.enrollment OWNER TO postgres;

--
-- Name: enrollment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.enrollment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.enrollment_id_seq OWNER TO postgres;

--
-- Name: enrollment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.enrollment_id_seq OWNED BY public.enrollment.id;


--
-- Name: homeCategory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."homeCategory" (
    id integer NOT NULL,
    "categoryId" integer NOT NULL,
    "imageId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."homeCategory" OWNER TO postgres;

--
-- Name: homeCategory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."homeCategory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."homeCategory_id_seq" OWNER TO postgres;

--
-- Name: homeCategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."homeCategory_id_seq" OWNED BY public."homeCategory".id;


--
-- Name: homeProductBanner; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."homeProductBanner" (
    id integer NOT NULL,
    "imageId" integer NOT NULL,
    "productId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."homeProductBanner" OWNER TO postgres;

--
-- Name: homeProductBanner_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."homeProductBanner_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."homeProductBanner_id_seq" OWNER TO postgres;

--
-- Name: homeProductBanner_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."homeProductBanner_id_seq" OWNED BY public."homeProductBanner".id;


--
-- Name: image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.image (
    id integer NOT NULL,
    "imageUrl" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "imageName" text NOT NULL
);


ALTER TABLE public.image OWNER TO postgres;

--
-- Name: image_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.image_id_seq OWNER TO postgres;

--
-- Name: image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.image_id_seq OWNED BY public.image.id;


--
-- Name: order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."order" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "addressId" integer NOT NULL,
    "shippingId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "paymentId" integer NOT NULL,
    "shippingPrice" integer NOT NULL,
    status text DEFAULT 'waiting'::text NOT NULL
);


ALTER TABLE public."order" OWNER TO postgres;

--
-- Name: orderProduct; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."orderProduct" (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    "productId" integer NOT NULL,
    quantity integer NOT NULL,
    price integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."orderProduct" OWNER TO postgres;

--
-- Name: orderProduct_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."orderProduct_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."orderProduct_id_seq" OWNER TO postgres;

--
-- Name: orderProduct_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."orderProduct_id_seq" OWNED BY public."orderProduct".id;


--
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_id_seq OWNER TO postgres;

--
-- Name: order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_id_seq OWNED BY public."order".id;


--
-- Name: payment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "expirationMonth" integer NOT NULL,
    "expirationYear" integer NOT NULL,
    "firstSixDigits" text NOT NULL,
    idempotency text NOT NULL,
    installments integer NOT NULL,
    "issuerId" text NOT NULL,
    "lastFourDigits" text NOT NULL,
    "payerDocumentNumber" text NOT NULL,
    "payerDocumentType" text NOT NULL,
    "payerEmail" text NOT NULL,
    "paymentId" integer NOT NULL,
    "paymentStatus" text NOT NULL,
    "paymentStatusDetails" text NOT NULL,
    "paymentType" text NOT NULL,
    "transactionAmount" integer NOT NULL
);


ALTER TABLE public.payment OWNER TO postgres;

--
-- Name: payment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payment_id_seq OWNER TO postgres;

--
-- Name: payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payment_id_seq OWNED BY public.payment.id;


--
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id integer NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    price integer NOT NULL,
    stock integer NOT NULL,
    "salesAmount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "highPrice" integer
);


ALTER TABLE public.product OWNER TO postgres;

--
-- Name: productCategory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."productCategory" (
    id integer NOT NULL,
    "productId" integer NOT NULL,
    "categoryId" integer NOT NULL
);


ALTER TABLE public."productCategory" OWNER TO postgres;

--
-- Name: productCategory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."productCategory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."productCategory_id_seq" OWNER TO postgres;

--
-- Name: productCategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."productCategory_id_seq" OWNED BY public."productCategory".id;


--
-- Name: productFavorite; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."productFavorite" (
    id integer NOT NULL,
    "productId" integer NOT NULL,
    "userId" integer NOT NULL
);


ALTER TABLE public."productFavorite" OWNER TO postgres;

--
-- Name: productFavorite_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."productFavorite_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."productFavorite_id_seq" OWNER TO postgres;

--
-- Name: productFavorite_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."productFavorite_id_seq" OWNED BY public."productFavorite".id;


--
-- Name: productImage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."productImage" (
    id integer NOT NULL,
    "productId" integer NOT NULL,
    "imageId" integer NOT NULL,
    "mainImage" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."productImage" OWNER TO postgres;

--
-- Name: productImage_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."productImage_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."productImage_id_seq" OWNER TO postgres;

--
-- Name: productImage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."productImage_id_seq" OWNED BY public."productImage".id;


--
-- Name: productSubCategory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."productSubCategory" (
    id integer NOT NULL,
    "productId" integer NOT NULL,
    "subCategoryId" integer NOT NULL
);


ALTER TABLE public."productSubCategory" OWNER TO postgres;

--
-- Name: productSubCategory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."productSubCategory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."productSubCategory_id_seq" OWNER TO postgres;

--
-- Name: productSubCategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."productSubCategory_id_seq" OWNED BY public."productSubCategory".id;


--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_id_seq OWNER TO postgres;

--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public.session OWNER TO postgres;

--
-- Name: sessionAdmin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."sessionAdmin" (
    id integer NOT NULL,
    "userAdminId" integer NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public."sessionAdmin" OWNER TO postgres;

--
-- Name: sessionAdmin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."sessionAdmin_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."sessionAdmin_id_seq" OWNER TO postgres;

--
-- Name: sessionAdmin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."sessionAdmin_id_seq" OWNED BY public."sessionAdmin".id;


--
-- Name: session_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.session_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.session_id_seq OWNER TO postgres;

--
-- Name: session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.session_id_seq OWNED BY public.session.id;


--
-- Name: shipping; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shipping (
    id integer NOT NULL,
    price integer NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL
);


ALTER TABLE public.shipping OWNER TO postgres;

--
-- Name: shipping_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shipping_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shipping_id_seq OWNER TO postgres;

--
-- Name: shipping_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shipping_id_seq OWNED BY public.shipping.id;


--
-- Name: subCategory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."subCategory" (
    id integer NOT NULL,
    name text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "showInMenu" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."subCategory" OWNER TO postgres;

--
-- Name: subCategory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."subCategory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."subCategory_id_seq" OWNER TO postgres;

--
-- Name: subCategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."subCategory_id_seq" OWNED BY public."subCategory".id;


--
-- Name: tecnicDetails; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."tecnicDetails" (
    id integer NOT NULL,
    topic text NOT NULL,
    "topicDetail" text,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "productId" integer NOT NULL
);


ALTER TABLE public."tecnicDetails" OWNER TO postgres;

--
-- Name: tecnicDetails_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."tecnicDetails_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."tecnicDetails_id_seq" OWNER TO postgres;

--
-- Name: tecnicDetails_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."tecnicDetails_id_seq" OWNED BY public."tecnicDetails".id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: userAdmin; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."userAdmin" (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."userAdmin" OWNER TO postgres;

--
-- Name: userAdmin_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."userAdmin_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."userAdmin_id_seq" OWNER TO postgres;

--
-- Name: userAdmin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."userAdmin_id_seq" OWNED BY public."userAdmin".id;


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: address id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address ALTER COLUMN id SET DEFAULT nextval('public.address_id_seq'::regclass);


--
-- Name: banner id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banner ALTER COLUMN id SET DEFAULT nextval('public.banner_id_seq'::regclass);


--
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- Name: categorySubCategory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."categorySubCategory" ALTER COLUMN id SET DEFAULT nextval('public."categorySubCategory_id_seq"'::regclass);


--
-- Name: enrollment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollment ALTER COLUMN id SET DEFAULT nextval('public.enrollment_id_seq'::regclass);


--
-- Name: homeCategory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."homeCategory" ALTER COLUMN id SET DEFAULT nextval('public."homeCategory_id_seq"'::regclass);


--
-- Name: homeProductBanner id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."homeProductBanner" ALTER COLUMN id SET DEFAULT nextval('public."homeProductBanner_id_seq"'::regclass);


--
-- Name: image id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image ALTER COLUMN id SET DEFAULT nextval('public.image_id_seq'::regclass);


--
-- Name: order id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order" ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);


--
-- Name: orderProduct id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."orderProduct" ALTER COLUMN id SET DEFAULT nextval('public."orderProduct_id_seq"'::regclass);


--
-- Name: payment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment ALTER COLUMN id SET DEFAULT nextval('public.payment_id_seq'::regclass);


--
-- Name: product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Name: productCategory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productCategory" ALTER COLUMN id SET DEFAULT nextval('public."productCategory_id_seq"'::regclass);


--
-- Name: productFavorite id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productFavorite" ALTER COLUMN id SET DEFAULT nextval('public."productFavorite_id_seq"'::regclass);


--
-- Name: productImage id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productImage" ALTER COLUMN id SET DEFAULT nextval('public."productImage_id_seq"'::regclass);


--
-- Name: productSubCategory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productSubCategory" ALTER COLUMN id SET DEFAULT nextval('public."productSubCategory_id_seq"'::regclass);


--
-- Name: session id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session ALTER COLUMN id SET DEFAULT nextval('public.session_id_seq'::regclass);


--
-- Name: sessionAdmin id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."sessionAdmin" ALTER COLUMN id SET DEFAULT nextval('public."sessionAdmin_id_seq"'::regclass);


--
-- Name: shipping id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shipping ALTER COLUMN id SET DEFAULT nextval('public.shipping_id_seq'::regclass);


--
-- Name: subCategory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."subCategory" ALTER COLUMN id SET DEFAULT nextval('public."subCategory_id_seq"'::regclass);


--
-- Name: tecnicDetails id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tecnicDetails" ALTER COLUMN id SET DEFAULT nextval('public."tecnicDetails_id_seq"'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: userAdmin id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."userAdmin" ALTER COLUMN id SET DEFAULT nextval('public."userAdmin_id_seq"'::regclass);


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
0af7dd94-7b67-472a-a389-8a218216a6b3	0f4d4ac2e8de4fd00c4976ede06f7fb545ca7e1fff502643ce31ab19e51ee30d	2023-11-09 12:26:13.613059+00	20230703213135_add_enum_to_order_status	\N	\N	2023-11-09 12:26:13.610395+00	1
e032f4e1-27c8-44e2-9bec-892ff73b87fd	a1d58551e364441e56072930bd5d175ab44810adea6c48081e5deb8e9fd59c9e	2023-11-09 12:26:13.450762+00	20230511145602_first_generate_product_and_user	\N	\N	2023-11-09 12:26:13.419266+00	1
4c1cc1cb-75a6-4d67-b2de-d133c76449dc	10d7446cb344f837177d0247fde9c9c374d1898107675a34591119c9b2988526	2023-11-09 12:26:13.504198+00	20230531171110_add_address_useradmin_enrollment	\N	\N	2023-11-09 12:26:13.451628+00	1
5dbfa42e-4e55-4dcf-81b1-88407dd1dffd	a16d967c28c492e1ef4ab6a7c6d826891cd813614eaeecc7165cb369531e811a	2023-11-09 12:26:13.71837+00	20230724005850_edit_payment_table	\N	\N	2023-11-09 12:26:13.714466+00	1
262875b7-aa0b-460e-830f-fd858cd2531a	de00bde4f44c3a25a138dd70f1c289392d81be4aa3de785f65b53738893a7d66	2023-11-09 12:26:13.513025+00	20230531200529_birthday_type_change_to_string	\N	\N	2023-11-09 12:26:13.505015+00	1
3b35f473-bde0-4c2d-a206-877a48423a73	3ab1a82c03045e49d0c3851706f71ac52e94a604c040db987668452c64904f8e	2023-11-09 12:26:13.621874+00	20230713154756_add_tecnicdetails_table	\N	\N	2023-11-09 12:26:13.613846+00	1
3c877a0e-66f1-4452-963e-2f3ca295e074	a85bef8363caadf28207e01e68a510c69defca835d41091fa55186a3dda24f3f	2023-11-09 12:26:13.516097+00	20230531200720_remove_name_from_enrollment	\N	\N	2023-11-09 12:26:13.513905+00	1
cdcaeac4-e27f-494f-95e0-3266633de4f6	cb07730ceb123fc949e557156e8dd45142ccc82cd6e48e0c0f975c15bbe2fa4d	2023-11-09 12:26:13.520326+00	20230531211427_userid_in_enrollment_is_unique	\N	\N	2023-11-09 12:26:13.517106+00	1
e9a80779-7d87-40da-b2b9-d3177740795e	e079cdd112b005ba8791475f079cc23a8b50e3aa90a8bcd2c7a13079b56aa739	2023-11-09 12:26:13.522946+00	20230531213718_insert_is_active_in_address	\N	\N	2023-11-09 12:26:13.521137+00	1
d08308cf-46b6-437c-808a-71b3e9640a61	1781fd38853d7debecf7694fcd12b2d567031d637f70c026162075b8bdd39c9d	2023-11-09 12:26:13.62429+00	20230714135113_add_imagename_to_table_image	\N	\N	2023-11-09 12:26:13.622671+00	1
c65c06b7-0bcb-419e-a80b-3aed577ee62d	22a5f24017fda847bc749dd1366ef353393c6ef38fcc64ddbe712b04d4fa3540	2023-11-09 12:26:13.530202+00	20230606130623_inser_admin_session	\N	\N	2023-11-09 12:26:13.523812+00	1
284914c7-5fdd-4fd7-92bb-6e34bd827520	249aceeb11597923c10bf4b93e93a71f37034c06a68d766794a32eab096aa817	2023-11-09 12:26:13.536297+00	20230626164714_create_shipping_table	\N	\N	2023-11-09 12:26:13.531008+00	1
0eae7403-5da9-4012-96d2-415b6a17ec63	80da34b2e77a18d30a032b1dfcbee6e4b481a48b08cee828f7cd9195339ae301	2023-11-09 12:26:13.539183+00	20230626193635_add_isactived_to_category	\N	\N	2023-11-09 12:26:13.53704+00	1
0b85ee09-ec8a-4b05-b024-b7331eb69555	603ca855fd9cc7d34b9ddf4752e79a69362b266e9698d25fa4014f8b7b615abf	2023-11-09 12:26:13.628589+00	20230714210901_fix_productid_in_tecnicdetails_table	\N	\N	2023-11-09 12:26:13.62516+00	1
02c49e19-9fb4-47aa-a872-20baa825420b	dd3156ada6d41670f670ab0cc090560dfab246054c8b4160b0db5cd53097ef60	2023-11-09 12:26:13.542081+00	20230626230918_add_isactive_to_product	\N	\N	2023-11-09 12:26:13.539993+00	1
b4a439dc-2a86-48bb-adfb-e26734badce6	bb8caba506d56d39a643c7f339889db67a2aa7546b6efaab0cb94d84f29a8291	2023-11-09 12:26:13.544426+00	20230630212742_insert_default_value_to_sales_amount	\N	\N	2023-11-09 12:26:13.54279+00	1
6b57de2b-2e44-482b-97ee-8ea0552ebb6c	a9a414334acd6d56ab26b863f89784a0050818ce513baa350fafcbae8b312a94	2023-11-09 12:26:13.720961+00	20230726222103_add_shippingprice_to_orders	\N	\N	2023-11-09 12:26:13.719197+00	1
a33453f7-7c29-4310-810f-e2471883793c	968d6e45090ecfa0021014de0f5217abbb3ac20af5ee292b2db529aec9e6de6d	2023-11-09 12:26:13.609427+00	20230701192607_create_table_order_and_order_product	\N	\N	2023-11-09 12:26:13.545223+00	1
85b2e5c0-bff3-4aa0-af26-6685dc42cda9	bf5a047a4aadeaea53e3f72009f7cb9b8f5bc3c16eff871d38e4aaea24854d27	2023-11-09 12:26:13.634116+00	20230719140548_add_payments_table	\N	\N	2023-11-09 12:26:13.629612+00	1
92d31327-54da-484f-acbd-ff5a59518e40	544955a31151d39f7f63c266902205d4766b6e849de5e040473ff4adae3532cd	2023-11-09 12:26:13.636379+00	20230721141605_add_addres_name_to_address	\N	\N	2023-11-09 12:26:13.634848+00	1
787a6782-d59e-4c8f-8b00-691daca1c8f9	ee00ba39261f1154acddac42dad6a47d47af9425b64f18938032effc3afbb3eb	2023-11-09 12:26:13.725126+00	20230727004306_add_status_for_order	\N	\N	2023-11-09 12:26:13.721695+00	1
61761f83-e2d2-445c-b7d2-200fa92814db	9f1fea5958d548fe70a89ccebd4b3489368423c390d224f8b110b83b3591ce51	2023-11-09 12:26:13.708704+00	20230722142022_create_homecategory_and_banner_table	\N	\N	2023-11-09 12:26:13.637129+00	1
6068d371-5cf9-4a0e-8e3c-5dd405581036	5202352cb3b7d85954f3c7d99bbaf8e32e22b54b37073d1e6af310dd39923514	2023-11-09 12:26:13.713665+00	20230722162412_create_favorite_table	\N	\N	2023-11-09 12:26:13.709502+00	1
9626d7b0-58a8-4b5c-8c74-5986e029daf9	82fb0d34a4b62498910dffc62367302f8ad7bbec4eb07235222759b48cd05955	2023-11-09 12:26:13.728069+00	20230802165224_add_highprice_to_product	\N	\N	2023-11-09 12:26:13.726043+00	1
2c25cb8e-690c-45fe-af79-328e806f8d0c	dbe4862b6be7229a6a56448ac726e23642406d286c385681f661b91a5b374d20	2023-11-09 12:26:13.735081+00	20230814184621_create_product_ads_table	\N	\N	2023-11-09 12:26:13.728916+00	1
e8a99c3c-ec5b-4b16-8369-8e3859fc5787	da0be16b77d8ca161a28411caf1ba24aa0af63abd97293899219761a6491c846	2023-11-09 12:26:13.747452+00	20230903235001_insert_subcategories_and_relation_tables	\N	\N	2023-11-09 12:26:13.735874+00	1
\.


--
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.address (id, "userId", "mainAddress", cep, street, city, state, number, neighborhood, "addressDetail", "createdAt", "updatedAt", "isActive", "addressName") FROM stdin;
\.


--
-- Data for Name: banner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.banner (id, text, "imageId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (id, name, "createdAt", "updatedAt", "isActive", "showInMenu") FROM stdin;
\.


--
-- Data for Name: categorySubCategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."categorySubCategory" (id, "categoryId", "subCategoryId") FROM stdin;
\.


--
-- Data for Name: enrollment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.enrollment (id, "userId", cpf, birthday, phone, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: homeCategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."homeCategory" (id, "categoryId", "imageId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: homeProductBanner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."homeProductBanner" (id, "imageId", "productId", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.image (id, "imageUrl", "createdAt", "updatedAt", "imageName") FROM stdin;
\.


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."order" (id, "userId", "addressId", "shippingId", "createdAt", "updatedAt", "paymentId", "shippingPrice", status) FROM stdin;
\.


--
-- Data for Name: orderProduct; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."orderProduct" (id, "orderId", "productId", quantity, price, "createdAt") FROM stdin;
\.


--
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment (id, "userId", "createdAt", "updatedAt", "expirationMonth", "expirationYear", "firstSixDigits", idempotency, installments, "issuerId", "lastFourDigits", "payerDocumentNumber", "payerDocumentType", "payerEmail", "paymentId", "paymentStatus", "paymentStatusDetails", "paymentType", "transactionAmount") FROM stdin;
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (id, name, description, price, stock, "salesAmount", "createdAt", "updatedAt", "isActive", "highPrice") FROM stdin;
\.


--
-- Data for Name: productCategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."productCategory" (id, "productId", "categoryId") FROM stdin;
\.


--
-- Data for Name: productFavorite; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."productFavorite" (id, "productId", "userId") FROM stdin;
\.


--
-- Data for Name: productImage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."productImage" (id, "productId", "imageId", "mainImage") FROM stdin;
\.


--
-- Data for Name: productSubCategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."productSubCategory" (id, "productId", "subCategoryId") FROM stdin;
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.session (id, "userId", token, "createdAt", "updatedAt", "isActive") FROM stdin;
\.


--
-- Data for Name: sessionAdmin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."sessionAdmin" (id, "userAdminId", token, "createdAt", "updatedAt", "isActive") FROM stdin;
\.


--
-- Data for Name: shipping; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shipping (id, price, name, "createdAt", "updatedAt", "isActive") FROM stdin;
\.


--
-- Data for Name: subCategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."subCategory" (id, name, "createdAt", "updatedAt", "isActive", "showInMenu") FROM stdin;
\.


--
-- Data for Name: tecnicDetails; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."tecnicDetails" (id, topic, "topicDetail", "updatedAt", "productId") FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, name, email, password, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: userAdmin; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."userAdmin" (id, name, email, password, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.address_id_seq', 1, false);


--
-- Name: banner_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.banner_id_seq', 1, false);


--
-- Name: categorySubCategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."categorySubCategory_id_seq"', 1, false);


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq', 1, false);


--
-- Name: enrollment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.enrollment_id_seq', 1, false);


--
-- Name: homeCategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."homeCategory_id_seq"', 1, false);


--
-- Name: homeProductBanner_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."homeProductBanner_id_seq"', 1, false);


--
-- Name: image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.image_id_seq', 1, false);


--
-- Name: orderProduct_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."orderProduct_id_seq"', 1, false);


--
-- Name: order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_id_seq', 1, false);


--
-- Name: payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payment_id_seq', 1, false);


--
-- Name: productCategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."productCategory_id_seq"', 1, false);


--
-- Name: productFavorite_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."productFavorite_id_seq"', 1, false);


--
-- Name: productImage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."productImage_id_seq"', 1, false);


--
-- Name: productSubCategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."productSubCategory_id_seq"', 1, false);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_id_seq', 1, false);


--
-- Name: sessionAdmin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."sessionAdmin_id_seq"', 1, false);


--
-- Name: session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.session_id_seq', 1, false);


--
-- Name: shipping_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shipping_id_seq', 1, false);


--
-- Name: subCategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."subCategory_id_seq"', 1, false);


--
-- Name: tecnicDetails_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."tecnicDetails_id_seq"', 1, false);


--
-- Name: userAdmin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."userAdmin_id_seq"', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 1, false);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: address address_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (id);


--
-- Name: banner banner_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banner
    ADD CONSTRAINT banner_pkey PRIMARY KEY (id);


--
-- Name: categorySubCategory categorySubCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."categorySubCategory"
    ADD CONSTRAINT "categorySubCategory_pkey" PRIMARY KEY (id);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: enrollment enrollment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollment
    ADD CONSTRAINT enrollment_pkey PRIMARY KEY (id);


--
-- Name: homeCategory homeCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."homeCategory"
    ADD CONSTRAINT "homeCategory_pkey" PRIMARY KEY (id);


--
-- Name: homeProductBanner homeProductBanner_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."homeProductBanner"
    ADD CONSTRAINT "homeProductBanner_pkey" PRIMARY KEY (id);


--
-- Name: image image_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image
    ADD CONSTRAINT image_pkey PRIMARY KEY (id);


--
-- Name: orderProduct orderProduct_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."orderProduct"
    ADD CONSTRAINT "orderProduct_pkey" PRIMARY KEY (id);


--
-- Name: order order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);


--
-- Name: payment payment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_pkey PRIMARY KEY (id);


--
-- Name: productCategory productCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productCategory"
    ADD CONSTRAINT "productCategory_pkey" PRIMARY KEY (id);


--
-- Name: productFavorite productFavorite_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productFavorite"
    ADD CONSTRAINT "productFavorite_pkey" PRIMARY KEY (id);


--
-- Name: productImage productImage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productImage"
    ADD CONSTRAINT "productImage_pkey" PRIMARY KEY (id);


--
-- Name: productSubCategory productSubCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productSubCategory"
    ADD CONSTRAINT "productSubCategory_pkey" PRIMARY KEY (id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: sessionAdmin sessionAdmin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."sessionAdmin"
    ADD CONSTRAINT "sessionAdmin_pkey" PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);


--
-- Name: shipping shipping_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shipping
    ADD CONSTRAINT shipping_pkey PRIMARY KEY (id);


--
-- Name: subCategory subCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."subCategory"
    ADD CONSTRAINT "subCategory_pkey" PRIMARY KEY (id);


--
-- Name: tecnicDetails tecnicDetails_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tecnicDetails"
    ADD CONSTRAINT "tecnicDetails_pkey" PRIMARY KEY (id);


--
-- Name: userAdmin userAdmin_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."userAdmin"
    ADD CONSTRAINT "userAdmin_pkey" PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: category_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX category_name_key ON public.category USING btree (name);


--
-- Name: enrollment_cpf_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX enrollment_cpf_key ON public.enrollment USING btree (cpf);


--
-- Name: enrollment_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "enrollment_userId_key" ON public.enrollment USING btree ("userId");


--
-- Name: product_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX product_name_key ON public.product USING btree (name);


--
-- Name: sessionAdmin_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "sessionAdmin_token_key" ON public."sessionAdmin" USING btree (token);


--
-- Name: session_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX session_token_key ON public.session USING btree (token);


--
-- Name: shipping_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX shipping_name_key ON public.shipping USING btree (name);


--
-- Name: subCategory_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "subCategory_name_key" ON public."subCategory" USING btree (name);


--
-- Name: userAdmin_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "userAdmin_email_key" ON public."userAdmin" USING btree (email);


--
-- Name: user_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX user_email_key ON public."user" USING btree (email);


--
-- Name: address address_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT "address_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: banner banner_imageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.banner
    ADD CONSTRAINT "banner_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES public.image(id);


--
-- Name: categorySubCategory categorySubCategory_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."categorySubCategory"
    ADD CONSTRAINT "categorySubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.category(id);


--
-- Name: categorySubCategory categorySubCategory_subCategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."categorySubCategory"
    ADD CONSTRAINT "categorySubCategory_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES public."subCategory"(id);


--
-- Name: enrollment enrollment_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrollment
    ADD CONSTRAINT "enrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: homeCategory homeCategory_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."homeCategory"
    ADD CONSTRAINT "homeCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.category(id);


--
-- Name: homeCategory homeCategory_imageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."homeCategory"
    ADD CONSTRAINT "homeCategory_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES public.image(id);


--
-- Name: homeProductBanner homeProductBanner_imageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."homeProductBanner"
    ADD CONSTRAINT "homeProductBanner_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES public.image(id);


--
-- Name: homeProductBanner homeProductBanner_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."homeProductBanner"
    ADD CONSTRAINT "homeProductBanner_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.product(id);


--
-- Name: orderProduct orderProduct_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."orderProduct"
    ADD CONSTRAINT "orderProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."order"(id);


--
-- Name: orderProduct orderProduct_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."orderProduct"
    ADD CONSTRAINT "orderProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.product(id);


--
-- Name: order order_addressId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES public.address(id);


--
-- Name: order order_paymentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "order_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES public.payment(id);


--
-- Name: order order_shippingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "order_shippingId_fkey" FOREIGN KEY ("shippingId") REFERENCES public.shipping(id);


--
-- Name: order order_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: payment payment_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment
    ADD CONSTRAINT "payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: productCategory productCategory_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productCategory"
    ADD CONSTRAINT "productCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.category(id);


--
-- Name: productCategory productCategory_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productCategory"
    ADD CONSTRAINT "productCategory_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.product(id);


--
-- Name: productFavorite productFavorite_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productFavorite"
    ADD CONSTRAINT "productFavorite_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.product(id);


--
-- Name: productFavorite productFavorite_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productFavorite"
    ADD CONSTRAINT "productFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: productImage productImage_imageId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productImage"
    ADD CONSTRAINT "productImage_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES public.image(id);


--
-- Name: productImage productImage_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productImage"
    ADD CONSTRAINT "productImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.product(id);


--
-- Name: productSubCategory productSubCategory_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productSubCategory"
    ADD CONSTRAINT "productSubCategory_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.product(id);


--
-- Name: productSubCategory productSubCategory_subCategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productSubCategory"
    ADD CONSTRAINT "productSubCategory_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES public."subCategory"(id);


--
-- Name: sessionAdmin sessionAdmin_userAdminId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."sessionAdmin"
    ADD CONSTRAINT "sessionAdmin_userAdminId_fkey" FOREIGN KEY ("userAdminId") REFERENCES public."userAdmin"(id);


--
-- Name: session session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: tecnicDetails tecnicDetails_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."tecnicDetails"
    ADD CONSTRAINT "tecnicDetails_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.product(id);


--
-- PostgreSQL database dump complete
--