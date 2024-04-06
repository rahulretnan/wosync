CREATE  INDEX "created_by_idx" on
  "activity"."logs" using btree ("created_by");
