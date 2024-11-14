-- Create triggers to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ language 'plpgsql';
-- Add triggers for each table
CREATE TRIGGER update_ships_updated_at BEFORE
UPDATE ON "ships" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ship_dockings_updated_at BEFORE
UPDATE ON "ship_dockings" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vehicles_updated_at BEFORE
UPDATE ON "vehicles" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_employees_updated_at BEFORE
UPDATE ON "employees" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tours_updated_at BEFORE
UPDATE ON "tours" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tour_component_instances_updated_at BEFORE
UPDATE ON "tour_component_instances" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();