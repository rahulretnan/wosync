CREATE TABLE "public"."intergrations" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "integration_type" text NOT NULL, "store_id" uuid NOT NULL, "api_key" text NOT NULL, "metadata" jsonb NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("store_id") REFERENCES "public"."stores"("id") ON UPDATE cascade ON DELETE cascade, UNIQUE ("integration_type", "store_id"));COMMENT ON TABLE "public"."intergrations" IS E'Store integration list';
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updated_at"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_intergrations_updated_at"
BEFORE UPDATE ON "public"."intergrations"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updated_at"();
COMMENT ON TRIGGER "set_public_intergrations_updated_at" ON "public"."intergrations"
IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE EXTENSION IF NOT EXISTS pgcrypto;
