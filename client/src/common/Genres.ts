import { Button } from "../components/Buttons/Button";
import BookEntity from "../components/Container/Book";

interface GenreProps {
  book_title?: string;
  book_id?: number;
  sci_fi?: boolean;
  fantasy?: boolean;
  romance?: boolean;
  action_adventure?: boolean;
  slice_of_life?: boolean;
  comedy?: boolean;
  tragedy?: boolean;
  mystery?: boolean;
  thriller?: boolean;
  horror?: boolean;
  isekai?: boolean;
  reincarnation?: boolean;
  transmigration?: boolean;
  historical?: boolean;
  military?: boolean;
  school?: boolean;
  spy?: boolean;
  martial_arts?: boolean;
}

export default GenreProps;
