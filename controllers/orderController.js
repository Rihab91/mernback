
const express=require("express")
const order=require("../models/orderModel")

const CreateOrder=async(req,res)=>{
try {
    const { user, product, description,prix,prixTotal,quantité } = req.body; 
    const newOrder=await order.create({user, product,quantité, description,prix,prixTotal})
    // const savedOrder = await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
const getAllOrders = async (req, res) => {
    try {
      const orders = await order.find();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
      const Order = await order.findById(id);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { user, product, description,prix,prix_Total } = req.body;
  
    try {
      const updatedOrder = await order.findByIdAndUpdate(id, { user, product, description,prix,prix_Total }, { new: true });
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedOrder = await order.findByIdAndDelete(id);
      if (!deletedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  module.exports={CreateOrder,getAllOrders,getOrderById,updateOrder,deleteOrder}