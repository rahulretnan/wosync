CREATE  INDEX "user_store_idx" on
  "activity"."logs" using btree ("created_by", "store_id");
