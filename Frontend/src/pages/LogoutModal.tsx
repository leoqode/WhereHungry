import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button as UIbutton } from "@/components/ui/button";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onLogout }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out? You will need to log in again to access your account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <UIbutton onClick={onClose} className="bg-gray-200 text-gray-800 hover:bg-gray-300">
            Cancel
          </UIbutton>
          <UIbutton onClick={onLogout} className="bg-red-500 text-white hover:bg-red-600">
            Logout
          </UIbutton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutModal;
