alter table "activity"."logs"
  add constraint "logs_store_id_fkey"
  foreign key ("store_id")
  references "public"."stores"
  ("id") on update cascade on delete cascade;
