interface ChildrenProps {
  children: React.ReactNode;
}

interface PostType {
  id: number;
  title: string;
  desc: string;
  is_completed: boolean;
}

type partialUpdateType = {
  id: number;
  isCompleted: boolean;
};

type PostData = {
  id: number;
  title: string;
  desc: string;
};

interface TodoFormData {
  title: string;
  desc: string;
}
interface TodoFormProps {
  onSubmit: (data: TodoFormData) => void;
  InitialValue?: TodoFormData;
}
