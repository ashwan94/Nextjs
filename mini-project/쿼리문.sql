
-- USERS TABLE 관련 query
CREATE TABLE users (
  `user_no` bigint NOT NULL AUTO_INCREMENT,
  `user_id` varchar(100) NOT NULL,
  `user_pw` varchar(100) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `user_gender` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `user_location` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `user_nickname` varchar(100) DEFAULT NULL,
  `user_field` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `user_intro` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `create_date` date NOT NULL,
  `modify_date` date NOT NULL,
  PRIMARY KEY (`user_no`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

select * from users;

insert into users (user_id, user_pw, user_name, create_date, modify_date) values("테계", "비번","테스트", CURRENT_DATE(),CURRENT_DATE())




-- USERS GROUP MAPPING 관련 query
create table user_group_mapping(
	`user_id` varchar(100) NOT NULL,
	`group_id` bigint NOT NULL,
	`status` varchar(100) NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT current_timestamp,
	PRIMARY KEY(`user_id`, `group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- STATUS
-- 0 : 초대 대기, 1 : 조합원
-- 조합원 리스트
-- 레이드 조합원
insert into user_group_mapping (user_id, group_id, status) values('1q', 1, 1); -- 매니저
insert into user_group_mapping (user_id, group_id, status) values('abc', 1, 1);
insert into user_group_mapping (user_id, group_id, status) values('1412', 1, 1);

-- 버거킹 조합원
insert into user_group_mapping (user_id, group_id, status) values('네이버', 2, 1); -- 매니저
insert into user_group_mapping (user_id, group_id, status) values('abc', 2, 1);

-- 당근마켓 조합원
insert into user_group_mapping (user_id, group_id, status) values('air', 3, 1); -- 매니저
insert into user_group_mapping (user_id, group_id, status) values('11111', 3, 1);
insert into user_group_mapping (user_id, group_id, status) values('12421', 3, 1);

select * from user_group_mapping;




-- USERS GROUPS 관련 query
create table user_groups (
	`group_id` bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`group_name` varchar(100) NOT NULL,
	`group_comment` varchar(100) NOT NULL,
	`group_manager` varchar(100) NOT NULL,
	`create_date` timestamp NOT NULL DEFAULT current_timestamp,
	`modify_date` date NULL
);

-- 레이드 그룹
insert into user_groups (group_name, group_comment, group_manager) values('주니어발록 토벌', '득템 기원', '1q');

-- 버거킹 그룹
insert into user_groups (group_name, group_comment, group_manager) values('버거킹', '와퍼 주문 그만 좀...', '네이버');

-- 당근마켓 그룹
insert into user_groups (group_name, group_comment, group_manager) values('당근마켓', '에어드랍', 'air');

select * from user_groups;



-- 테스트
-- USERS 와 USER_GROUP_MAPPING 조인
select *
from users u
inner join user_group_mapping ugm on u.user_no = ugm.user_id;

-- USER_GROUP_MAPPING 와 USER_GROUPS 조인
select *
from user_group_mapping ugm
inner join user_groups ug on ugm.group_id = ug.group_id;


-- USERS, USER_GROUP_MAPPING, USER_GROUPS 테이블 조인
-- 무소속 유저까지 전부 확인
-- 그룹 매니저 이름이 ??? 일때 USERS 의 status check하기
select u.user_name , u.user_field , u.user_location , u.user_intro, s1.status
from USERS u
left outer join (
	SELECT ugm.user_id, ugm.group_id, ugm.status
	from user_group_mapping ugm 
	inner join user_groups ug 
	on ugm.group_id  = ug.group_id
	where ug.group_manager='네이버'
	) s1
on u.user_id = s1.user_id;

SELECT *
FROM USERS u 
LEFT OUTER JOIN (
	SELECT ugm.user_id , ugm.group_id, ugm.status, ug.group_name , ug.group_manager 
	from user_group_mapping ugm 
	inner join user_groups ug on ugm.group_id = ug.group_id
) a
on u.user_name = a.user_id;



-- 로그인된 계정의 그룹 정보
select *
from (
	SELECT u.user_id, u.user_no, ugm.group_id, u.user_name, u.user_field, u.user_location, 
	u.user_intro, ugm.status, ug.group_name, ug.group_manager
	from users u
	inner join user_group_mapping ugm on u.user_no = ugm.user_id
	inner join user_groups ug on ugm.group_id  = ug.group_id
) a
order by group_name;

-- 취득한 그룹 정보로 소속된 모든 그룹 리스트 출력
select *
from users u
inner join user_group_mapping ugm on u.user_no = ugm.user_id 
inner join user_groups ug on ugm.group_id = ug.group_id
where ug.group_name = '당근마켓';

-- SEND 버튼 동작 시 초대장 보내기
insert into user_group_mapping (user_id, group_id, status) values(
(
	select u.user_id
	from users u
	where u.user_name = '주형구렁이빨'
)
,
(
	select ug.group_id 
	from user_groups ug
	where ug.group_manager = 'air'
)
,
0);

SELECT *
from user_group_mapping ugm
order by create_date desc;


-- 전체 유저 수
select count(*)
from users;

-- 전체 지역 수
select COUNT(DISTINCT user_location)
from users u
where u.user_location is not null;



-- 전체 그룹 수
select count(*)
from user_groups ug ;


-- 유저 수, 지역 수, 그룹 수를 한꺼번에 취득
select
COUNT(user_id) as user_cnt,
COUNT(DISTINCT user_location ) user_location,
	(
		select count(*)
		from user_groups ug
	) as group_cnt
from users u ;