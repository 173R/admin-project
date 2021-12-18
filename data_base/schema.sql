create sequence mcu_id_seq
    as integer;

alter sequence mcu_id_seq owner to artemdb;

create sequence place_id_seq
    as integer;

alter sequence place_id_seq owner to artemdb;

create sequence "sensor_id_seq"
    as integer;

alter sequence "sensor_id_seq" owner to artemdb;

create sequence "s_m_cross_id_seq"
    as integer;

alter sequence "s_m_cross_id_seq" owner to artemdb;

create sequence "smc_p_cross_id_seq"
    as integer;

alter sequence "smc_p_cross_id_seq" owner to artemdb;

create sequence sdata_id_seq
    as integer;

alter sequence sdata_id_seq owner to artemdb;

create table if not exists mcu
(
    id          integer default nextval('mcu_id_seq'::regclass) not null
        constraint mcu_pk
            primary key,
    name        varchar(30)                                     not null,
    mac         varchar(17)                                     not null,
    description text
)
;

alter table mcu
    owner to artemdb;

create unique index if not exists mcu_pk
    on mcu (id);

create unique index if not exists mcu_mac_uindex
    on mcu (mac);

create table if not exists "sensor"
(
    id          integer default nextval('"sensor_id_seq"'::regclass) not null
        constraint sensor_pk
            primary key,
    name        varchar(30)                                          not null,
    data_type   varchar(30)                                          not null,
    description text
)
;

alter table "sensor"
    owner to artemdb;

create unique index if not exists sensor_pk
    on "sensor" (id);

create table if not exists place
(
    id          integer default nextval('place_id_seq'::regclass) not null
        constraint place_pk
            primary key,
    name        varchar(30)                                       not null,
    description text
)
;

alter table place
    owner to artemdb;

create unique index if not exists place_pk
    on place (id);

create table if not exists "s_m_cross"
(
    id integer default nextval('"s_m_cross_id_seq"'::regclass) not null
        constraint s_m_cross_pk
            primary key,
    sensor_id integer
        constraint s_m_cross_sensor_id_fk
            references "sensor",
    mcu_id    integer
        constraint s_m_cross_mcu_id_fk
            references mcu
)
;

alter table "s_m_cross"
    owner to artemdb;

create unique index if not exists s_m_cross_pk
    on "s_m_cross" (id);

create unique index if not exists s_m_cross_sensor_id_uindex
    on "s_m_cross" (sensor_id);

create table if not exists "smc_p_cross"
(
    id         integer default nextval('"smc_p_cross_id_seq"'::regclass) not null
        constraint smc_p_cross_pk
            primary key,
    "smc_id"   integer
        constraint smc_p_cross_s_m_cross_id_fk
            references "s_m_cross",
    place_id   integer
        constraint smc_p_cross_place_id_fk
            references place,
    is_enabled boolean default false,
    time_start timestamp,
    time_stop  timestamp
)
;

alter table "smc_p_cross"
    owner to artemdb;

create unique index if not exists smc_p_cross_pk
    on "smc_p_cross" (id);

create unique index if not exists smc_p_cross_smc_id_uindex
    on "smc_p_cross" ("smc_id");

create table if not exists sdata
(
    id           integer   default nextval('sdata_id_seq'::regclass) not null
        constraint sdata_pk
            primary key,
    date_time    timestamp default CURRENT_TIMESTAMP,
    sensor_value real,
    "smcpc_id"   integer
        constraint sdata_smc_p_cross_id_fk
            references "smc_p_cross"
)
;

alter table sdata
    owner to artemdb;

create unique index if not exists sdata_pk
    on sdata (id);

