INSERT INTO public.mcu (id, name, mac, description) VALUES (1, 'Arduino Uno', '06:D9:79:7E:76:FE', 'Процессор: ATmega328');
INSERT INTO public.mcu (id, name, mac, description) VALUES (2, 'Arduino Mega 2560 R3', '18:F8:77:6B:65:DF', 'Процессор: ATmega2560');
INSERT INTO public."sensor" (id, name, data_type, description) VALUES (1, 'DS18B20', 'temperature', 'Цифровой датчик температуры DS18B20');
INSERT INTO public."sensor" (id, name, data_type, description) VALUES (2, 'DHT11', 'humidity', 'Датчик влажности и температуры DHT11');
INSERT INTO public."sensor" (id, name, data_type, description) VALUES (3, 'MQ7', 'concentration', 'Датчик угарного газа MQ7');
INSERT INTO public."sensor" (id, name, data_type, description) VALUES (4, 'GY-302', 'illumination', 'Датчик интенсивности света GY-302');
INSERT INTO public."s_m_cross" (sensor_id, mcu_id, id) VALUES (1, 1, 5);
INSERT INTO public."s_m_cross" (sensor_id, mcu_id, id) VALUES (3, 1, 6);
INSERT INTO public."s_m_cross" (sensor_id, mcu_id, id) VALUES (2, 2, 7);
INSERT INTO public."s_m_cross" (sensor_id, mcu_id, id) VALUES (4, 2, 8);
INSERT INTO public.place (id, name, description) VALUES (1, 'L441', 'Компьютерный класс');
INSERT INTO public.place (id, name, description) VALUES (2, 'L521', 'Химическая лаборатория');
INSERT INTO public."smc_p_cross" (id, "smc_id", place_id, is_enabled, time_start, time_stop) VALUES (1, 5, 1, false, null, null);
INSERT INTO public."smc_p_cross" (id, "smc_id", place_id, is_enabled, time_start, time_stop) VALUES (2, 6, 2, false, null, null);
INSERT INTO public."smc_p_cross" (id, "smc_id", place_id, is_enabled, time_start, time_stop) VALUES (3, 7, 1, false, null, null);
INSERT INTO public."smc_p_cross" (id, "smc_id", place_id, is_enabled, time_start, time_stop) VALUES (4, 8, 2, false, null, null);
INSERT INTO public.sdata (id, date_time, sensor_value, "smcpc_id") VALUES (1, '2021-12-04 20:08:32.000000', 20.3, 1);
INSERT INTO public.sdata (id, date_time, sensor_value, "smcpc_id") VALUES (2, '2021-12-04 20:09:24.000000', 20.5, 1);
INSERT INTO public.sdata (id, date_time, sensor_value, "smcpc_id") VALUES (3, '2021-12-04 20:09:50.000000', 127, 2);
INSERT INTO public.sdata (id, date_time, sensor_value, "smcpc_id") VALUES (4, '2021-12-04 20:10:25.000000', 207.3, 4);



