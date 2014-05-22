<?php

class InventoryModel extends CI_Model {

    function __construct()
    {
        parent::__construct();
    }

    function save_inventory($inventory_id)
    {
        $sql = "INSERT INTO inventory (
                inventoryID,
                created,
                modified)
                VALUES (?,NOW(),NOW())";
        try {
           if($this->db->query($sql, array($inventory_id))) {
                return true;
           } else {
                throw new Exception('inventory can not be saved');
           }
        } catch (Exception $e){
            //log_message('error',$e->getMessage());
            return false;
        }
    }

    function save_inventory_category($inventory_id, $category_id, $value)
    {
        $sql = "INSERT INTO inventorycategories (
                inventoryID,
                categoryID,
                value)
                VALUES (?,?,?)";
        try {
           if($this->db->query($sql, array($inventory_id, $category_id, $value))) {
                return true;
           } else {
                throw new Exception('inventory category can not be saved');
           }
        } catch (Exception $e){
            //log_message('error',$e->getMessage());
            return false;
        }
    }

    function save_media($media_id, $media_name, $media_ext)
    {
        $sql = "INSERT INTO media (
                mediaID,
                name,
                extension,
                created,
                modified)
                VALUES (?,?,?,NOW(),NOW())";
        try {
           if($this->db->query($sql, array($media_id, $media_name, $media_ext))) {
                return true;
           } else {
                throw new Exception('media can not be saved');
           }
        } catch (Exception $e){
            //log_message('error',$e->getMessage());
            return false;
        }
    }

    function save_inventory_media($inventory_id, $media_id)
    {
        $sql = "INSERT INTO inventorymedia (
                inventoryID,
                mediaID)
                VALUES (?,?)";
        try {
           if($this->db->query($sql, array($inventory_id, $media_id))) {
                return true;
           } else {
                throw new Exception('inventory media can not be saved');
           }
        } catch (Exception $e){
            //log_message('error',$e->getMessage());
            return false;
        }
    }

    function fetch_all_inventoies() {
        $inventories = array();

        $inventory_sql = "SELECT inventoryID,
                            created,
                            modified
                        FROM inventory";

        $inventory_category_sql = "SELECT i.inventoryID,
                                         c.categoryID,
                                         ic.value,
                                         c.categoryName
                                  FROM inventory i
                                  INNER JOIN inventorycategories ic ON i.inventoryID = ic.inventoryID
                                  INNER JOIN categories c ON ic.categoryID = c.categoryID";

        $inventory_media_sql = "SELECT i.inventoryID,
                                     m.mediaID,
                                     m.name,
                                     m.extension
                                FROM inventory i
                                INNER JOIN inventorymedia im ON im.inventoryID = i.inventoryID
                                INNER JOIN media m ON m.mediaID = im.mediaID";

        $inventory_query = $this->db->query($inventory_sql);
        $inventory_category_query = $this->db->query($inventory_category_sql);
        $inventory_media_query = $this->db->query($inventory_media_sql);

        $inventory_result = $inventory_query->result();
        $inventory_category_result = $inventory_category_query->result();
        $inventory_media_result = $inventory_media_query->result();

        foreach ($inventory_result as $inventory) {
            $inv = array();
            $categories = array();
            $medias = array();

            $id = $inventory->inventoryID;
            $created = $inventory->created;
            $modified = $inventory->modified;

            $inv['id'] = $id;
            $inv['created'] = $created;
            $inv['modified'] = $modified;

            foreach ($inventory_category_result as $inv_cate) {
                if ($id == $inv_cate->inventoryID) {
                    $ic = array();
                    $ic['id'] = $inv_cate->categoryID;
                    $ic['name'] = $inv_cate->categoryName;
                    $ic['value'] = $inv_cate->value;
                    array_push($categories, $ic);
                }
            }

            foreach ($inventory_media_result as $inv_media) {
                if ($id == $inv_media->inventoryID) {
                    $im = array();
                    $im['id'] = $inv_media->mediaID;
                    $im['name'] = $inv_media->name;
                    $im['ext'] = $inv_media->extension;
                    array_push($medias, $im);
                }
            }

            $inv['category'] = $categories;
            $inv['media'] = $medias;

            array_push($inventories, $inv);
        }
        /*
        $sql = "SELECT i.inventoryID,
                       i.created,
                       i.modified,
                       c.categoryID,
                       ic.value,
                       c.categoryName,
                       m.mediaID,
                       m.name,
                       m.extension
                FROM inventory i
                INNER JOIN inventorycategories ic ON i.inventoryID = ic.inventoryID
                INNER JOIN categories c ON ic.categoryID = c.categoryID
                INNER JOIN inventorymedia im ON im.inventoryID = i.inventoryID
                INNER JOIN media m ON m.mediaID = im.mediaID";

        $query = $this->db->query($sql);

        return $query->result();
        */
       return $inventories;
    }

    function delete_inventory($inventory_id) {

        $inventory_id_array = array($inventory_id);

        $inventory_media_sql = "SELECT mediaID FROM inventorymedia
                                  WHERE inventoryID = ?";
        $inventory_media_query = $this->db->query($inventory_media_sql, $inventory_id_array);
        $inventory_media_result = $inventory_media_query->result();

        $media_id_array = array();

        foreach ($inventory_media_result as $inventory_media) {
            $media_id = $inventory_media->mediaID;
            array_push($media_id_array, $media_id);
        }

        $del_inventory_category_sql = "DELETE FROM inventorycategories
                                       WHERE inventoryID = ?";

        $del_inventory_media_sql = "DELETE FROM inventorymedia
                                WHERE inventoryID = ?";

        $del_inventory_category_query = $this->db->query($del_inventory_category_sql, $inventory_id_array);
        $del_inventory_media_query = $this->db->query($del_inventory_media_sql, $inventory_id);

        $del_media_indicator = 1;
        $media_file_array = array();

        if ($media_id_array) {
            foreach ($media_id_array as $mid) {
                $media_sql = "SELECT name FROM media
                              WHERE mediaID = ?";
                $media_query = $this->db->query($media_sql, array($mid));
                $media_result = $media_query->result();
                if ($media_result) {
                    $media_name = $media_result[0]->name;
                    array_push($media_file_array, $media_name);
                }

                $del_media_sql = "DELETE FROM media
                                  WHERE mediaID = ?";
                $del_media_query = $this->db->query($del_media_sql, array($mid));
                if (!$del_media_query) {
                    $del_media_indicator = 0;
                }
            }
        }

        $del_inventory_sql = "DELETE FROM inventory
                              WHERE inventoryID = ?";
        $del_inventory_query = $this->db->query($del_inventory_sql, $inventory_id_array);

        if ($del_inventory_category_query &&
            $del_inventory_query &&
            $del_inventory_media_query &&
            $del_media_indicator) {
            return $media_file_array;
        } else {
            return array();
        }
    }

    function update_inventory_category($inventory_id, $categories, $modified)
    {
        $success = false;
        $error = "";

        try
        {
            //Update inventory
            $update_invetory_sql = "UPDATE inventory SET modified = ? WHERE inventoryID = ?";
            if($this->db->query($update_invetory_sql, array($modified, $inventory_id)))
                $sucess = true;
            else
                $error = "Error when update inventory";

            //Inventorycategories
            foreach ($categories as $category) {
                $update_cat_sql = "UPDATE inventorycategories SET value = ? WHERE inventoryID = ? AND categoryID = ?";
                if($this->db->query($update_cat_sql, array($category['value'], $inventory_id, $category['id'])))
                    $sucess = true;
                else
                    $error = "Error when update inventorycategories";
            }
        }catch(Exception $e){
            $error = "Error when update inventory.";
        }

        if($success)
            return $success;
        else
            return $error;
    }
}
