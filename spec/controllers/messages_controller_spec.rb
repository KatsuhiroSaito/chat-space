require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe 'GET #index' do
    context "logged in" do
      before do
        login_user user
        get :index, params: { group_id: group.id }
      end

      it "assigns @message" do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it "renders the :index template" do
        expect(response).to render_template :index
      end
    end

    context "not logged in" do
      before do
        get :index, params: { group_id: group.id }
      end

      it "redirects to the sign-in page" do
        # expect(response).to redirect_to("/users/sign_in")
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
